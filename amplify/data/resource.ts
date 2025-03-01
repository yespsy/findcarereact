import {a, type ClientSchema, defineData} from '@aws-amplify/backend';

const schema = a.schema({
    Employer: a.model({
        id: a.id(),
        name: a.string(),
        phone: a.string(),
        coin: a.integer(),
        job: a.hasOne("Job", 'employerId'),
        candidates: a.hasMany("Candidate", 'employerId'),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"]).authorization((allow) => [allow.guest(),allow.authenticated()]),
    Job: a.model({
        id: a.id(),
        employerId: a.id(),
        employer: a.belongsTo("Employer", 'employerId'),
        title: a.string(),
        nurseRank: a.string(),
        salary: a.string(),
        location: a.string(),
        onboardDate: a.string(),
        requirements: a.string(),
        extraRequirements: a.string(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"]).authorization((allow) => [allow.guest()]),
    Candidate: a.model({
        id: a.id(),
        employerId: a.id(),
        employer: a.belongsTo("Employer", 'employerId'),
        nurse: a.belongsTo("Nurse", 'nurseId'),
        nurseId: a.id(),
        status: a.string(),
        interviewDate: a.string(),
        isFavor: a.boolean(),
        isNew: a.boolean(),
        isAlreadyInterviewed: a.boolean(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"]).authorization((allow) => [allow.guest()]),
    Nurse: a.model({
        id: a.id(),
        candidates: a.hasMany("Candidate", 'nurseId'),
        name: a.string(),
        rank: a.string(),
        status: a.string(),
        experience: a.string(),
        avatarPath: a.string(),
        resumeContent: a.string(),
        resumePdfPath: a.string(),
        createdAt: a.datetime(),
        updatedAt: a.datetime()
    }).identifier(["id"]).authorization((allow) => [allow.publicApiKey()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
    schema,
    authorizationModes: {
        defaultAuthorizationMode: 'apiKey',
        apiKeyAuthorizationMode: {
            expiresInDays: 7,
        },
    },
});
