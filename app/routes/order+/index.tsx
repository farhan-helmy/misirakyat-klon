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

const foodCategories = [
	'Mie',
	'Nasi',
	'Sushi',
	'Pizza',
	'Burger',
	'Salad',
	'Pasta',
	'DimSum',
	'Steak',
	'Ramen',
	'Tacos',
	'Eskem',
	'Kebab',
	'Soup',
	'Curry',
]

function FoodTypeList() {
	return (
		<div className="flex flex-row gap-2 overflow-auto">
			{foodCategories.map((category, index) => (
				<div key={index}>
					<div className="flex flex-col items-center justify-center rounded-md w-12">
						
                        <img src="/img/user.png" alt="user" className='h-8 w-8' />
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

export default function OrderRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className="p-4">
			<Header />
			<div className="pt-8">
				<FoodTypeList />
			</div>
			<h1>Order page</h1>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
