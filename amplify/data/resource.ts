import {a, type ClientSchema, defineData} from '@aws-amplify/backend';

const schema = a.schema({
    Employer: a.model({
        id: a.id(),
        name: a.string().default(''),
        phone: a.string().default(''),
        coin: a.integer().default(0),
        job: a.hasOne("Job", 'employerId'),
        candidates: a.hasMany("Candidate", 'employerId'),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"])
        .authorization((allow) => [allow.owner().to(['create', 'read', 'update'])]),
    Job: a.model({
        id: a.id(),
        employerId: a.string(),
        employer: a.belongsTo("Employer", 'employerId'),
        title: a.string().default('NO.XXX'),
        nurseRank: a.string().default('初級護理員'),
        salary: a.string().default('面議'),
        location: a.string().default('香港'),
        onboardDate: a.string().default('面議'),
        requirements: a.string().default('無'),
        extraRequirements: a.string().default('無'),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"])
        .authorization((allow) => [allow.publicApiKey().to(['read']), allow.owner()]),
    Candidate: a.model({
        id: a.id(),
        employerId: a.string().default(''),
        employer: a.belongsTo("Employer", 'employerId'),
        nurse: a.belongsTo("Nurse", 'nurseId'),
        nurseId: a.string().default(''),
        status: a.string().default('發送邀請'),
        interviewDate: a.string().default(''),
        isFavor: a.boolean().default(false),
        isNew: a.boolean().default(false),
        isAlreadyInterviewed: a.boolean().default(false),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"])
        .authorization((allow) => [allow.owner()]),
    Nurse: a.model({
        id: a.id(),
        candidates: a.hasMany("Candidate", 'nurseId'),
        name: a.string().default(''),
        rank: a.string().default(''),
        status: a.string().default(''),
        experience: a.string().default(''),
        avatarPath: a.string().default(''),
        resumeContent: a.string().default(''),
        resumePdfPath: a.string().default(''),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"])
        .authorization((allow) => [allow.publicApiKey(), allow.authenticated().to(['read'])]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 365,
        },
    },
});
