import loGet from 'lodash/get'

import ServerError from '../utils/serverError'
import elasticClient from '../utils/elasticsearch'
import MessageFacebook from '../models/messageFacebook'
import logger from '../utils/logger'
import { mappingConfMessage } from '../utils/constants'

export async function receiveMessage(req, res) {
    try {
        const { index, message } = req.body

        const isIndexCreated = await elasticClient.exists({
            index,
        })

        if (!isIndexCreated) {
            await elasticClient.indices.create({
                index,
                body: mappingConfMessage,
            }, (err, resp) => {
                if (err) {
                    throw new ServerError(`Can not create index ${err}`, 400)
                }
            });
        }

        const id = message._id.toString()
        delete message._id

        await elasticClient.create({
            index,
            id,
            body: {
                ...message,
            }
        }, (err, resp, status) => {
            res.status(200).json({
                message: 'Success',
                err, resp, status,
            })
        })

    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

export async function createIndex(req, res) {
    try {
        const { index } = req.body

        elasticClient.indices.create({
            index,
            body: mappingConfMessage,
        }, (err, resp) => {
            if (err) {
                logger.error(err)
                res.status(err.code || 500).json({ message: err.message })
            }
            else {
                res.status(200).json({
                    message: 'Success', resp,
                })
            }
        });
    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

export async function deleteIndex(req, res) {
    try {
        const { index } = req.body

        elasticClient.indices.delete({ index }, (err, resp, status) => {
            res.status(200).json({
                message: 'Success', resp,
            })
        });

    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

export async function syncMessage(req, res) {
    try {
        const isIndexCreated = await elasticClient.indices.exists({
            index: 'messages',
        })

        if (!isIndexCreated) {
            await elasticClient.indices.create({
                index: 'messages',
                body: mappingConfMessage,
            }, (err, resp) => {
                if (err) {
                    throw new ServerError(`Can not create index ${err}`, 400)
                }
            });
        }

        const totalMessages = await MessageFacebook.find().count()

        const limit = 200
        let skip = 0

        res.status(200).json({
            message: 'Success',
        })

        while (skip < totalMessages) {
            console.log(skip, totalMessages)
            const messages = await MessageFacebook.find().skip(skip).limit(limit)
            let arraysPromise = []
            if (messages.length > 0) {
                arraysPromise = messages.map(message => {
                    const id = message._id.toString()
                    message.id = id

                    delete message._id

                    return elasticClient.create({
                        index: 'messages',
                        id,
                        body: {
                            ...message,
                        }
                    }, (err, res, status) => {
                        console.log(err, res, status)
                    })
                });
            }

            await Promise.all(arraysPromise)
            skip += limit
            console.log('Done', skip + limit)
        }
    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}

export async function search(req, res) {
    try {
        const {
            index,
            message,
            limit,
            skip,
            startTime,
            endTime,
            filterTime,
        } = req.query

        const objQuery = {
            bool: {
                must: {
                    bool: {
                        should: [
                            { match: { '_doc.type': 'feed' } },
                            { match: { '_doc.type': 'messenger' } },
                        ],
                    }
                },
                must: [
                    {
                        wildcard: {
                            "_doc.username": "a*"
                        },
                    },
                    {
                        multi_match: {
                            query: message,
                            fields: ["_doc.messageSearch^3", "_doc.message"],
                            fuzziness: "AUTO",
                        },
                    },
                    {
                        range: {
                            '_doc.createdAt': { gte: startTime },
                        }
                    },
                    {
                        range: {
                            '_doc.createdAt': { lte: endTime },
                        },
                    },
                ],
                filter: [
                    { term: { '_doc.type': 'messenger' } },
                    { range: { "_doc.createdAt": { gte: filterTime } } }
                ],
            },
        }

        const source = ['_doc.message', '_doc.username', '_doc.createdAt']

        elasticClient.search({
            index,
            body: {
                from: skip,
                size: limit,
                query: objQuery,
                _source: source,
                highlight: {
                    fields: {
                        '_doc.message': {}
                    }
                }
            }
        }, (error, response, status) => {
            if (error) {
                console.log("search error: " + error)
            }
            else {
                res.status(200).json({
                    message: 'Success',
                    status,
                    data: loGet(response, ['hits', 'hits'], []),
                })
            }
        });
    } catch (err) {
        logger.error(err)
        res.status(err.code || 500).json({ message: err.message })
    }
}
