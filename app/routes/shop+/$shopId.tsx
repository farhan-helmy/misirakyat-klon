import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { type DataFunctionArgs, json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from '#app/components/ui/avatar.tsx'
import { Button } from '#app/components/ui/button.tsx'
import {
	Sheet,
	SheetTrigger,
	SheetContent,
	SheetTitle,
	SheetHeader,
    SheetFooter,
} from '#app/components/ui/sheet.tsx'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '#app/components/ui/tabs.tsx'
import { fakeMenuList } from './fakedata.ts'

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

function ShopCart() {
	return (
		<Sheet>
			<SheetTrigger>
				<div className="flex items-end justify-end">
					<div className="relative">
						<div className="t-0 absolute left-3">
							<p className="flex h-2 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">
								3
							</p>
						</div>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							className="file: mt-4 h-6 w-6"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
							/>
						</svg>
					</div>
				</div>
			</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Cart</SheetTitle>
				</SheetHeader>
				<div className="flex flex-col gap-2 pt-8">
					<div>
						<p className="text-md font-bold">Nasi Goreng</p>
                        <div className='grid grid-cols-2'>
                        <p className="text-xs">RM 5</p>
                        <p className='text-xs font-light text-gray-600 text-end'>x1</p>
                        </div>
					</div>
				</div>
                <SheetFooter className='fixed bottom-0 pb-2 text-center'>
                    <Button className='px-20'>Checkout</Button>
                </SheetFooter>
			</SheetContent>
		</Sheet>
	)
}
export default function ShopRoute() {
	const data = useLoaderData<typeof loader>()
	return (
		<div className="p-4">
			<div className="grid grid-cols-2">
				<Link to="/shop" className="flex flex-row items-center justify-start">
					<ArrowLeftIcon className="h-8 w-8" />
				</Link>
				<ShopCart />
			</div>

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
