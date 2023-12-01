import { prisma } from '#app/utils/db.server.ts'
import {
	cleanupDb,
	createPassword,
	createUser,
} from '#tests/db-utils.ts'

async function seed() {
	console.log('🌱 Seeding...')
	console.time(`🌱 Database has been seeded`)

	console.time('🧹 Cleaned up the database...')
	await cleanupDb(prisma)
	console.timeEnd('🧹 Cleaned up the database...')

	console.time('👑 Created roles...')
	await prisma.role.create({
		data: {
			name: 'user',
		},
	})
	await prisma.role.create({
		data: {
			name: 'vendor',
		},
	})
	await prisma.role.create({
		data: {
			name: 'rider',
		},
	})
	console.timeEnd('👑 Created roles...')

	const totalUsers = 5
	console.time(`👤 Created ${totalUsers} users...`)
	for (let index = 0; index < totalUsers; index++) {
		const userData = createUser()
		await prisma.user
			.create({
				select: { id: true },
				data: {
					...userData,
					password: { create: createPassword(userData.username) },
					image: {
						create: {
							altText: userData.name,
							url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Felix'

						}
					},
					roles: { connect: { name: 'user' } },
				},
			})
			.catch(e => {
				console.error('Error creating a user:', e)
				return null
			})
	}
	console.timeEnd(`👤 Created ${totalUsers} users...`)

	console.time(`🐨 Created vendor user "nasikandar"`)


	const userWithShop = await prisma.user.create({
		select: { id: true, shop: true },
		data: {
			email: 'nasi@kandar.com',
			username: 'nasikandar',
			name: 'nasikandar',
			image: {
				create: {
					altText: 'nasikandar',
					url: 'https://api.dicebear.com/7.x/notionists/svg?seed=nasikandar'
				}
			},
			password: { create: createPassword('nasikandar') },
			roles: { connect: [{ name: 'vendor' }, { name: 'user' }] },
			shop: {
				create: {
					name: 'Nasi Kandar',
				}
			}
		},
	})

	await prisma.menu.create({
		data: {
			name: 'Nasi Kandar',
			price: "10",
			menuImage: {
				create: {
					altText: 'nasikandar',
					url: 'https://api.dicebear.com/7.x/notionists/svg?seed=nasikandar'
				}
			},
			shop: {
				connect: {
					id: userWithShop.shop[0].id
				}
			}
		}
	})
	console.timeEnd(`🐨 Created vendor user "nasikandar"`)

	console.time(`🐨 Created rider "alirider"`)


	await prisma.user.create({
		select: { id: true },
		data: {
			email: 'ali@rider.com',
			username: 'alirider',
			name: 'Ali',
			image: {
				create: {
					altText: 'alirider',
					url: 'https://api.dicebear.com/7.x/notionists/svg?seed=Kody'
				}
			},
			password: { create: createPassword('nasikandar') },
			roles: { connect: [{ name: 'rider' }, { name: 'user' }] },
		},
	})
	console.timeEnd(`🐨 Created rider "alirider"`)

	console.timeEnd(`🌱 Database has been seeded`)
}

seed()
	.catch(e => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
