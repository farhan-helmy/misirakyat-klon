import { json, redirect, type DataFunctionArgs } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import { GeneralErrorBoundary } from '#app/components/error-boundary.tsx'

export async function loader({ request }: DataFunctionArgs) {
    return null
}

export default function OrderRoute() {
    const data = useLoaderData<typeof loader>()

    return(
        <div>
            <h1>Order page</h1>
        </div>
    )
}

export function ErrorBoundary() {
	return <GeneralErrorBoundary />
}
