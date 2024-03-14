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
                budgets: [
                    {
                        "_id": "4b309f8a13ec1c8f37a9e7c1",
                        "budgetLimit": 100,
                        "categoryId": "aed6f37b8052c1a98d49e0c2",
                        "userId": "96e7a79b3e812e1d09ec3219",
                        "familyId": "2c8d06eaa5012bf8734e6b47",
                        "createdAt": "2024-01-01T08:00:00.000Z",
                        "updatedAt": "2024-01-01T08:00:00.000Z"
                    },
                    {
                        "_id": "4b309f8a13ec1c8f37a9e7c2",
                        "budgetLimit": 200,
                        "categoryId": "aed6f37b8052c1a98d49e0c2",
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
                "budgetLimit": 100,
                "categoryId": "aed6f37b8052c1a98d49e0c2",
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
                message: 'No budget found'
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
                "budgetLimit": 300,
                "categoryId": "aed6f37b8052c1a98d49e0c2",
                "userId": "96e7a79b3e812e1d09ec3219",
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
                "budgetLimit": 400,
                "categoryId": "aed6f37b8052c1a98d49e0c2",
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
                "budgetLimit": 300,
                "categoryId": "aed6f37b8052c1a98d49e0c2",
                "userId": "96e7a79b3e812e1d09ec3219",
                "familyId": "2c8d06eaa5012bf8734e6b47",
                "createdAt": "2024-01-03T08:00:00.000Z",
                "updatedAt": "2024-01-03T08:00:00.000Z"
            }
        }
    }
};
