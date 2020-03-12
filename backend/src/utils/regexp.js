export const emailRule = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/, 'i') // eslint-disable-line
export const fullnameRule = new RegExp(/^[^\^$,`~.|?!@#%^&*\-+=(){}\\\[\]<>\d]+$/, 'i')  // eslint-disable-line

export const categoryNameRule = new RegExp(/^[^\^$,`~.|?!@#%^&*\-+=(){}\\\[\]<>]+$/, 'i')  // eslint-disable-line
export const slugRule = new RegExp(/^[^\^$,`~.|?!@#%^&*+=(){}\\\[\]<>]+$/, 'i')  // eslint-disable-line

export const usernameRule = new RegExp(/^[a-zA-Z0-9]+$/, 'i')
