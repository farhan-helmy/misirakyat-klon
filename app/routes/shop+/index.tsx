import { CopyIcon } from '@radix-ui/react-icons'
import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
	DialogClose,
} from '#app/components/ui/dialog.tsx'
import { Input } from '#app/components/ui/input.tsx'
import { Label } from '#app/components/ui/label.tsx'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '#app/components/ui/select.tsx'

import { foodCategories, fakeKedai } from './fakedata.ts'

function ShopList() {
	return (
		<div className='flex flex-col gap-2 overflow-auto max-h-screen'>
			{fakeKedai.map((kedai, index) => (
				<div key={index}>
					<Link to={`/shop/${kedai.nama}`}>
						<div className='p-4 flex flex-row items-center justify-between h-24 shadow-md border-gray-400 border rounded-md'>
							<div className='flex flex-row items-center gap-2'>
								<img src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${kedai.nama}`} alt="user" className='h-8 w-8' />
								<div className='tuncate'>
									<p className='text-md font-bold'>{kedai.nama}</p>
									<p className='text-xs italic font-light'>{kedai.review}</p>
								</div>
							</div>
							<div className='flex flex-row items-center gap-2'>
								<div>
									<p className='text-xs'>4.5</p>
								</div>
							</div>
						</div>
					</Link>
				</div>
			))}
		</div>
	)
}

function FoodTypeList() {
	return (
		<div className="flex flex-row overflow-auto">
			{foodCategories.map((category, index) => (
				<div key={index}>
					<div className="flex flex-col items-center justify-center rounded-md w-12">

						<img src={`https://api.dicebear.com/7.x/icons/svg?seed=${category}`} alt="user" className='h-8 w-8' />
						<div>
							<p className='text-xs'>{category}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

function PilihKawasanDialog() {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>Pilih Kawasan</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle>Pilih kawasan</DialogTitle>
					<DialogDescription>Pilih kawasan berdekatan anda.</DialogDescription>
				</DialogHeader>
				<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Negeri
						</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Negeri" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="light">Light</SelectItem>
								<SelectItem value="dark">Dark</SelectItem>
								<SelectItem value="system">System</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</div>
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button type="button" variant="secondary">
							Hantar
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

function Header() {
	return (
		<div className="flex flex-row justify-between">
			<div>Misi Klon | Makanan</div>
			<PilihKawasanDialog />
		</div>
	)
}

export async function loader({ request }: DataFunctionArgs) {
	return null
}

export default function ShopRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="p-4">
			<Header />
			<div className="pt-8">
				<FoodTypeList />
			</div>
			<div className='pt-4'>
				<ShopList />
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
