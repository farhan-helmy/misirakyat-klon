import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'
import { Button } from '#app/components/ui/button.tsx'

function Header() {
	return (
		<div className="flex flex-row justify-between">
			<div>Misi Klon | Makanan</div>
            <Button>
                Pilih Kawasan
            </Button>
		</div>
	)
}

export async function loader({ request }: DataFunctionArgs) {
	return null
}

export default function OrderRoute() {
	const data = useLoaderData<typeof loader>()

	return (
		<div className='p-4'>
            <Header />
			<h1>Order page</h1>
		</div>
	)
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
