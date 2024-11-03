import Image from "next/image"
import Link from "next/link"

const Loading = () => {
    return (
        <div className="
        overflow-y-hidden w-[calc(100vw-3.5rem)] md:w-[calc(100vw-6%)] h-[calc(100vh-6rem)] 
        flex justify-center items-center 
        "
        >
            <div className="flex justify-center items-center">
                <Image
                    className="animate-spin"
                    src={'/loading.png'}
                    alt=""
                    width={50}
                    height={50}   
                />
            </div>
        </div>
    )
}

export default Loading

