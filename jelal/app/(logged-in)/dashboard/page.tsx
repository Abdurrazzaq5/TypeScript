import CollectionHeader from "@/components/collection/collection-header"
import UserCollection from "@/components/collection/user-collection"

export default function Collection() {
    return (
        <section className="min-h-screen">
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
                <div className="flex flex-col items-center justify-center gap-6 text-center">
                    <CollectionHeader/>
                    <UserCollection/>
                </div>
                
            </div>
        </section>
    )
}