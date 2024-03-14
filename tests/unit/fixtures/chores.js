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
                chores: [
                    {
                        "_id": "4b309f8a13ec1c8f37a9e7c1",
                        "description": "description1",
                        "rewardType": "points",
                        "rewardValue": 100,
                        "deadlineAt": "2024-01-01T08:00:00.000Z",
                        "completed": false,
                        "childId": "c80f24e7a9b351dc2e6b6f58",
                        "userId": "96e7a79b3e812e1d09ec3219",
                        "familyId": "2c8d06eaa5012bf8734e6b47",
                        "createdAt": "2024-01-01T08:00:00.000Z",
                        "updatedAt": "2024-01-01T08:00:00.000Z"
                    },
                    {
                        "_id": "4b309f8a13ec1c8f37a9e7c2",
                        "description": "description2",
                        "rewardType": "points",
                        "rewardValue": 200,
                        "deadlineAt": "2024-01-02T08:00:00.000Z",
                        "completed": false,
                        "childId": "c80f24e7a9b351dc2e6b6f58",
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
                "description": "description1",
                "rewardType": "points",
                "rewardValue": 100,
                "deadlineAt": "2024-01-01T08:00:00.000Z",
                "completed": false,
                "childId": "c80f24e7a9b351dc2e6b6f58",
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
                message: 'No chore found'
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
                "description": "description3",
                "rewardType": "points",
                "rewardValue": 300,
                "deadlineAt": "2024-01-03T08:00:00.000Z",
                "completed": false,
                "childId": "c80f24e7a9b351dc2e6b6f58",
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
                "description": "description4",
                "rewardType": "points",
                "rewardValue": 400,
                "deadlineAt": "2024-01-04T08:00:00.000Z",
                "completed": false,
                "childId": "c80f24e7a9b351dc2e6b6f58",
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
                "description": "description3",
                "rewardType": "points",
                "rewardValue": 300,
                "deadlineAt": "2024-01-03T08:00:00.000Z",
                "completed": false,
                "childId": "c80f24e7a9b351dc2e6b6f58",
                "userId": "96e7a79b3e812e1d09ec3219",
                "familyId": "2c8d06eaa5012bf8734e6b47",
                "createdAt": "2024-01-03T08:00:00.000Z",
                "updatedAt": "2024-01-03T08:00:00.000Z"
            }
        }
    }
};
