export default {
    all: {
        success: {
            res: {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                }
            },
            body: {
                categories: [
                    {
                        "_id": "4b309f8a13ec1c8f37a9e7c1",
                        "name": "name1",
                        "icon": "icon1",
                        "color": "#000000",
                        "userId": "96e7a79b3e812e1d09ec3219",
                        "familyId": "2c8d06eaa5012bf8734e6b47",
                        "createdAt": "2024-01-01T08:00:00.000Z",
                        "updatedAt": "2024-01-01T08:00:00.000Z"
                    },
                    {
                        "_id": "4b309f8a13ec1c8f37a9e7c2",
                        "name": "name2",
                        "icon": "icon2",
                        "color": "#111111",
                        "userId": "96e7a79b3e812e1d09ec3219",
                        "familyId": "2c8d06eaa5012bf8734e6b47",
                        "createdAt": "2024-01-02T08:00:00.000Z",
                        "updatedAt": "2024-01-02T08:00:00.000Z"
                    }
                ]
            }
        }
    },
    single: {
        success: {
            res: {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                }
            },
            body: {
                "_id": "4b309f8a13ec1c8f37a9e7c1",
                "name": "name1",
                "icon": "icon1",
                "color": "#000000",
                "userId": "96e7a79b3e812e1d09ec3219",
                "familyId": "2c8d06eaa5012bf8734e6b47",
                "createdAt": "2024-01-01T08:00:00.000Z",
                "updatedAt": "2024-01-01T08:00:00.000Z"
            }
        },
        failure: {
            res: {
                statusCode: 404,
                headers: {
                    'content-type': 'application/json'
                }
            },
            body: {
                status: '404',
                message: 'No category found'
            }
        }
    },
    add: {
        success: {
            res: {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                }
            },
            body: {
                "_id": "4b309f8a13ec1c8f37a9e7c3",
                "name": "name3",
                "icon": "icon3",
                "color": "#222222",
                "familyId": "2c8d06eaa5012bf8734e6b47",
                "createdAt": "2024-01-03T08:00:00.000Z",
                "updatedAt": "2024-01-03T08:00:00.000Z"
            }
        }
    },
    update: {
        success: {
            res: {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                }
            },
            body: {
                "_id": "4b309f8a13ec1c8f37a9e7c3",
                "name": "name4",
                "icon": "icon4",
                "color": "#333333",
                "userId": "96e7a79b3e812e1d09ec3219",
                "familyId": "2c8d06eaa5012bf8734e6b47",
                "createdAt": "2024-01-03T08:00:00.000Z",
                "updatedAt": "2024-01-04T08:00:00.000Z"
            }
        }
    },
    delete: {
        success: {
            res: {
                statusCode: 200,
                headers: {
                    'content-type': 'application/json'
                }
            },
            body: {
                "_id": "4b309f8a13ec1c8f37a9e7c3",
                "name": "name3",
                "icon": "icon3",
                "color": "#222222",
                "userId": "96e7a79b3e812e1d09ec3219",
                "familyId": "2c8d06eaa5012bf8734e6b47",
                "createdAt": "2024-01-03T08:00:00.000Z",
                "updatedAt": "2024-01-03T08:00:00.000Z"
            }
        }
    }
};
