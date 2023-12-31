
import { type DataFunctionArgs } from '@remix-run/node'
import { Link } from '@remix-run/react'
import malaysiapostcodes from 'malaysia-postcodes'
import { useState } from 'react'
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
		<div className="flex flex-col gap-2">
			{fakeKedai.map((kedai, index) => (
				<div key={index}>
					<Link to={`/shop/${kedai.nama}`}>
						<div className="flex h-24 flex-row items-center justify-between rounded-md border border-gray-400 p-4 shadow-md">
							<div className="flex flex-row items-center gap-2">
								<img
									src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${kedai.nama}`}
									alt="user"
									className="h-8 w-8"
								/>
								<div className="tuncate">
									<p className="text-md font-bold">{kedai.nama}</p>
									<p className="text-xs font-light italic">{kedai.review}</p>
								</div>
							</div>
							<div className="flex flex-row items-center gap-2">
								<div>
									<p className="text-xs">4.5</p>
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
					<div className="flex w-12 flex-col items-center justify-center rounded-md">
						<img
							src={`https://api.dicebear.com/7.x/icons/svg?seed=${category}`}
							alt="user"
							className="h-8 w-8"
						/>
						<div>
							<p className="text-xs">{category}</p>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

function PilihKawasanDialog() {
	const [stateSelect, setStateSelect] = useState(false)
	const [cities, setCities] = useState<string[]>([])
	const states = malaysiapostcodes.getStates()

	const handleStateChange = (value: string) => {
		setStateSelect(true)
		setCities(malaysiapostcodes.getCities(value))
	}

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
						<Select onValueChange={handleStateChange}>
							<SelectTrigger>
								<SelectValue placeholder="Negeri" />
							</SelectTrigger>
							<SelectContent>
								{states.map((state, index) => (
									<SelectItem key={index} value={state}>
										{state}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				{stateSelect ? (
					<div className="flex items-center space-x-2">
					<div className="grid flex-1 gap-2">
						<Label htmlFor="link" className="sr-only">
							Daerah
						</Label>
						<Select>
							<SelectTrigger>
								<SelectValue placeholder="Daerah" />
							</SelectTrigger>
							<SelectContent>
								{cities.map((city, index) => (
									<SelectItem key={index} value={city}>
										{city}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>
				): null}
				<DialogFooter className="sm:justify-start">
					<DialogClose asChild>
						<Button variant="secondary" onClick={() => setStateSelect(false)}>
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
			<Link to="/">
				<div>Misi Klon | Kedai</div>
			</Link>
			<PilihKawasanDialog />
		</div>
	)
}

export async function loader({ }: DataFunctionArgs) {
	return null
}

export default function ShopRoute() {

	return (
		<div className="p-4">
			<Header />
			<div className="pt-8">
				<FoodTypeList />
			</div>
			<div className="pt-4">
				<ShopList />
			</div>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
