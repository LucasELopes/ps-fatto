import Image from "next/image";
import Link from "next/link";

type Props = {
    iconSite: string
    imageChart: string
}

const SideBar = ({iconSite, imageChart}: Props) => {
    return (
        <div className="bg-primaryColor w-max-[128px] h-screen flex flex-col items-center">
            <div className="h-[10%] h-max-[112px]">
                <Link href={'/'}>
                    <Image
                    className="hover:rotate-[360deg] transition-all duration-500"
                        src={iconSite}
                        width={140}
                        height={10}
                        alt="Logo"
                    />
                </Link>
            </div>
            <div className="h-full w-full p-3 flex flex-col justify-center items-center gap-y-7">
                <div className="h-[10%] h-max-[100px]">
                    <Link href={'/charts'}>
                        <Image
                            className="hover:invert hover:scale-110 duration-300 w-5/12 m-auto" 
                            src={imageChart}
                            width={400}
                            height={400}
                            alt="Chart"
                        />
                    </Link>
                </div>
                <div className="h-[10%] h-max-[100px]">
                    <Link
                        href={'https://google.com'}
                        target="_blank"
                    >
                        <Image 
                            className="hover:invert hover:scale-110 duration-300 w-5/12 m-auto" 
                            src={'/activity.png'} 
                            width={400} 
                            height={400}
                            alt="Done tasks" 
                        />
                    </Link>
                </div>       
                <div className="h-[10%] h-max-[100px]">
                    <Link
                        href={'https://google.com'}
                        target="_blank"
                    >
                        <Image 
                            className="hover:invert hover:scale-110 duration-300 w-10/12 m-auto" 
                            src={'/icons8-add-50.png'} 
                            width={400} 
                            height={400}
                            alt="ADD" 
                        />
                    </Link>
                </div>
                <div className="h-[10%] max-h-[100px]">
                    <Link
                        href={'https://google.com'}
                        target="_blank"
                    >
                        <Image 
                            className="hover:invert hover:scale-110 duration-300 w-5/12 h-auto m-auto" 
                            src={'/alert.png'} 
                            alt="deadlines tasks"
                            width={400} // apenas para evitar o erro, pode ser um valor alto
                            height={400} // apenas para evitar o erro, pode ser um valor alto
                        />
                    </Link>
                </div>
    
                <div className="h-[10%] h-max-[100px]">
                    <Link
                        href={'https://google.com'}
                        target="_blank"
                    >
                        <Image 
                            className="hover:invert hover:scale-110 duration-300 w-5/12 m-auto" 
                            src={'/pending.png'} 
                            width={400} 
                            height={400}
                            alt="ADD" 
                        />
                    </Link>
                </div> 
            </div>
        </div>  
    )
}

export default SideBar;