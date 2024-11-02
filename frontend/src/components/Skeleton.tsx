
import { ReactNode } from "react";
import Header from "./Header";
import SideBar from "./SideBar";
import Charts from "./Charts";

type Props = {
    children: ReactNode;
}

const Skeleton = ({children}: Props) => {
    return (
        <div className="grid grid-cols-12 h-screen">
            <div className="col-span-1">
                <SideBar iconSite="/logoSite.png" imageChart="/pie-chart.png"></SideBar>
            </div>
            <div className="col-span-11 row-span-6">
                <Header></Header>
                {children}
            </div>      
        </div>
    )
}

export default Skeleton;