import {useRef, useState} from "react";

interface CandidateFilterProps {
    update: (value: (((prevState: string) => string) | string)) => void
}

export default function Page({update}: CandidateFilterProps) {
    const myRef = useRef(null);
    const [filterName, setFilterName] = useState('全部')
    // @ts-expect-error none
    const onClick = (e, v:string) => {
        if (myRef.current?.['open']) {
            setFilterName(e.target.innerText)
            // @ts-expect-error set false
            myRef.current['open'] = false;
            update(v)
        }
    }

    return (
        <details className="dropdown" ref={myRef}>
            <summary className="mt-3 ml-7 text-2xl font-bold text-primary">{filterName}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 py-1 mt-2 ml-6 shadow-xl text-lg">
                <li onClick={(e) => onClick(e, 'all')}><a>全部</a></li>
                <li onClick={(e) => onClick(e, 'favor')}><p>收藏</p></li>
                <li onClick={(e) => onClick(e, 'new')}><a>新增</a></li>
                <li onClick={(e) => onClick(e, 'interviewed')}><a>面過</a></li>
            </ul>
        </details>
    );
}
