import { type DataFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Avatar, AvatarFallback, AvatarImage } from "#app/components/ui/avatar.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#app/components/ui/tabs.tsx"



export async function loader({ params }: DataFunctionArgs) {
    return json({ shopId: params.shopId })
}

function ReviewList() {
    return (
        <div>
            review list
        </div>
    )
}
function MenuList() {
    return (
        <div>
            menu list
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
        <div className="p-8">
            <div className="flex flex-col items-center justify-center">
                <Avatar className="w-24 h-24">
                    <AvatarImage src={`https://api.dicebear.com/7.x/shapes/svg?seed=${data.shopId}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <p>{data.shopId}</p>
                </div>
                <div className="text-center pt-8">
                    <ShopTabs />
                </div>
            </div>
        </div>
    )
}