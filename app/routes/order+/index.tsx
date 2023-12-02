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

function Header() {
	return (
		<div className="flex flex-row justify-between">
			<div>Misi Klon | Makanan</div>
			<Dialog>
				<DialogTrigger asChild>
					<Button>Pilih Kawasan</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-md">
					<DialogHeader>
						<DialogTitle>Share link</DialogTitle>
						<DialogDescription>
							Anyone who has this link will be able to view this.
						</DialogDescription>
					</DialogHeader>
					<div className="flex items-center space-x-2">
						<div className="grid flex-1 gap-2">
							<Label htmlFor="link" className="sr-only">
								Link
							</Label>
							<Input
								id="link"
								defaultValue="https://ui.shadcn.com/docs/installation"
								readOnly
							/>
						</div>
						<Button type="submit" size="sm" className="px-3">
							<span className="sr-only">Copy</span>
							<CopyIcon className="h-4 w-4" />
						</Button>
					</div>
					<DialogFooter className="sm:justify-start">
						<DialogClose asChild>
							<Button type="button" variant="secondary">
								Close
							</Button>
						</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
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
			<h1>Order page</h1>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
