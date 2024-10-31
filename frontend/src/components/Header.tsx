import Link from "next/link";

const Header = () => {
    return (
        <div className="w-full h-[10%] h-max-[112px] bg-secondColor flex justify-end items-center px-8">
            <Link
                href={'https://google.com'}
                target="_blank"
                className="
                    bg-primaryColor p-2 w-4/12 max-w-[160px] text-center rounded-lg
                    text-white font-bold hover:bg-white hover:border hover:border-primaryColor
                    hover:text-primaryColor hover:  duration-200
                "
            >
                Criar tarefa
            </Link>
        </div>
    )
}

export default Header;