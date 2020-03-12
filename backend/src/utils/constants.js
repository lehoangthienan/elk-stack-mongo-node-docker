export const mappingConfMessage = {
    settings: {
        index: {
            number_of_shards: 1,
            // number_of_replicas: 2,
        },
    },
    mappings: {
        properties: {
            id: {
                type: 'keyword',
            },
            clinic: {
                type: 'keyword',
            },
            fbPageId: {
                type: 'keyword',
            },
            username: {
                type: 'text',
            },
            avatarUser: {
                type: 'string',
            },
            message: {
                type: 'text',
            },
            fromId: {
                type: 'string',
            },
            customer: {
                type: 'keyword',
            },
            usernameSearch: {
                type: 'text',
            },
            messageSearch: {
                type: 'text',
            },
            type: {
                type: 'string',
            },
            parentId: {
                type: 'keyword',
            },
            commentId: {
                type: 'keyword',
            },
            postId: {
                type: 'keyword',
            },
            createdAt: {
                type: 'date',
            },
            updatedAt: {
                type: 'date',
            },
        }
    }
}
