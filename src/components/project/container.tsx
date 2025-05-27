import {ReactNode} from "react";

export const Container = ({children}: { children: ReactNode  }) => {
    return <div className={'max-w-[100rem] mx-auto xl:pt-16 pt-6 pb-2 xl:pb-6 px-2 md:px-8'}>
        {children}
    </div>
}