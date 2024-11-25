import { Button } from "@/components/ui/button";


const HomePage = () => {
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">DashBoard</h1>
            </div>
            <div
                x-chunk="An empty state showing no products with a heading, description and a call to action to add a product."
                className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
            >
                <div className="max-w-[420px] text-center">
                    <h2 className="mb-2 text-lg font-semibold">No books added</h2>
                    <p className="mb-4 text-muted-foreground">
                        You don't have any books yet. Start adding some.
                    </p>
                    <Button>Add Books</Button>
                </div>
            </div>
        </>
    )
}

export default HomePage;
