import { type DataFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '#app/components/ui/avatar.tsx'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '#app/components/ui/tabs.tsx'
import { fakeMenuList } from './fakedata.ts'
import { Button } from '#app/components/ui/button.tsx'
import { ArrowLeftIcon, ThickArrowLeftIcon } from '@radix-ui/react-icons'

export async function loader({ params }: DataFunctionArgs) {
	return json({ shopId: params.shopId })
}

function ReviewList() {
	return <div>review list</div>
}
function MenuList() {
	return (
		<div className="max-h-screen overflow-auto">
			{fakeMenuList.map((item, index) => (
				<div key={index} className="w-96 py-4">
					<div className="flex flex-row p-4">
						<div className="h-16 w-16 rounded-md bg-gray-200"></div>
						<div className="flex w-32 flex-col truncate pl-4 text-left">
							<p className="text-lg font-semibold">{item.nama}</p>
							<p className="text-gray-500">{item.harga}</p>
						</div>
						<div className="pl-12">
							<Button>Add to cart</Button>
						</div>
					</div>
				</div>
			))}
		</div>
	)
}

function ShopTabs() {
	return (
		<Tabs defaultValue="menu">
			<TabsList>
				<TabsTrigger value="menu">Menu</TabsTrigger>
				<TabsTrigger value="reviews">Reviews</TabsTrigger>
			</TabsList>
			<TabsContent value="menu">
				<MenuList />
			</TabsContent>
			<TabsContent value="reviews">
				<ReviewList />
			</TabsContent>
		</Tabs>
	)
}
export default function ShopRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<div className="p-4">
			<Link to="/shop" className="flex flex-row items-center justify-start">
				<ArrowLeftIcon className="h-8 w-8" />
			</Link>
			<div className="flex flex-col items-center justify-center">
				<Avatar className="h-24 w-24">
					<AvatarImage
						src={`https://api.dicebear.com/7.x/shapes/svg?seed=${data.shopId}`}
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<div className="text-center">
					<p>{data.shopId}</p>
				</div>
				<div className="pt-8 text-center">
					<ShopTabs />
				</div>
			</div>
		</div>
	)
}
