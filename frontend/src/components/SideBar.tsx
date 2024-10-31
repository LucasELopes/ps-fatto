import Image from "next/image";

type Props = {
    image?: string
}

const SideBar = ({image}: Props) => {
    return (
        <div className="bg-primaryColor w-max-[128px] h-screen">
            <div className="h-[10%] h-max-[112px]">
                {image && 
                    <Image
                        src={image}
                        width={140}
                        height={10}
                        alt="Logo"
                    />
                }
            </div>
        </div>  
    )
}

export default SideBar;