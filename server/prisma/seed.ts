import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Jhon Doe',
            email: 'jhon.doe@gmail.com',
            avatarUrl: 'https://gravatar.com/avatar/ad6d8e8e9a4c81d31a5b35360d964d62?s=400&d=robohash&r=x'
        }
    });

    const pool = await prisma.pool.create({
        data: {
            title: 'Example Pool',
            code: 'BOL123',
            ownerId: user.id,

            participants: {
                create: {
                    userId: user.id
                }
            }
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-02T12:00:00.895Z',
            firstTeamCountryCode: 'DE',
            secondTeamCountryCode: 'BR'
        }
    });

    await prisma.game.create({
        data: {
            date: '2022-11-03T12:00:00.895Z',
            firstTeamCountryCode: 'BR',
            secondTeamCountryCode: 'AR',

            guesses: {
                create: {
                    firstTeamPoints: 2,
                    secondTeamPoints: 1,

                    participant: {
                        connect: {
                            userId_poolId: {
                                userId: user.id,
                                poolId: pool.id
                            }
                        }
                    }
                }
            }
        }
    });

    // const participant = await prisma.participant.create({
    //     data: {
    //         poolId: pool.id,
    //         userId: user.id
    //     }
    // });
}

main();