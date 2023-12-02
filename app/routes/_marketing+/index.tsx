import { type MetaFunction } from '@remix-run/node'

import { Link } from '@remix-run/react'

import {
	Alert,
	AlertDescription,
	AlertTitle,
} from '#app/components/ui/alert.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '#app/components/ui/card.tsx'
import { Icon } from '#app/components/ui/icon.tsx'

export const meta: MetaFunction = () => [{ title: 'Misi Klon' }]

export default function Index() {
	return (
		<main className="relative min-h-screen sm:flex sm:items-center sm:justify-center">
			<Link to="order">
				<div className="p-2">
					<Alert className="flex flex-row justify-between">
						<div>
							<AlertTitle>Selamat datang!</AlertTitle>
							<AlertDescription>Order makanan anda sekarang.</AlertDescription>
						</div>
						<div className="p-2">
							<Icon name="arrow-right" className="h-6 w-6 text-gray-500" />
						</div>
					</Alert>
				</div>
			</Link>
			<div className='flex flex-row items-center justify-between p-2 gap-2'>
			<Card>
				<CardHeader>
					<CardTitle>Vendor</CardTitle>
					<CardDescription>Daftar sebagai vendor</CardDescription>
				</CardHeader>
				<CardContent>
					<Button> Daftar </Button>
				</CardContent>
				
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Rider</CardTitle>
					<CardDescription>Daftar sebagai rider</CardDescription>
				</CardHeader>
				<CardContent>
				<Button> Daftar </Button>
				</CardContent>
				
			</Card>
			</div>
			
		</main>
	)
}
