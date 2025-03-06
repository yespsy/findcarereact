import {useRef, useState} from "react";

interface CandidateFilterProps {
    update: (value: (((prevState: string) => string) | string)) => void
}

export default function CandidateFilter({update}: CandidateFilterProps) {
    const myRef = useRef(null);
    const [filterName, setFilterName] = useState('全部')
    // @ts-expect-error none
    const onClick = (e, v:string) => {
        if (myRef.current?.['open']) {
            if(v==='all')setFilterName('全部');
            if(v==='favor')setFilterName('收藏');
            if(v==='new')setFilterName('新增');
            if(v==='interviewed')setFilterName('面過');
            // @ts-expect-error set false
            myRef.current['open'] = false;
            update(v)
        }
    }
    function selected() {
        return <img alt='' src="/dashboard/check.png" className="w-8 h-8" />
    }
    const itemImgCls = "inline-block w-8 h-8 mr-2 ml-1 my-3"
    return (
        <details className="dropdown z-20" ref={myRef}>
            <summary className="mt-3 ml-7 text-22p font-bold text-primary">{filterName}</summary>
            <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-64 py-0 mt-2 ml-6 px-0 shadow-xl text-22p divide-y divide-[#98A2B3] font-normal">
                <li onClick={(e) => onClick(e, 'all')}>
                    <a><img alt='' src="/dashboard/user.png" className={itemImgCls} />全部{filterName==='全部'?selected():''}</a>
                </li>
                <li onClick={(e) => onClick(e, 'favor')}>
                    <a><img alt='' src="/dashboard/favor.png" className={itemImgCls} />收藏{filterName==='收藏'?selected():''}</a>
                </li>
                <li onClick={(e) => onClick(e, 'new')}>
                    <a><div className="float-left absolute ml-[11px] text-white">1</div>
                        <img alt='' src="/dashboard/circle.png" className={itemImgCls} />新增{filterName==='新增'?selected():''}</a>
                </li>
                <li onClick={(e) => onClick(e, 'interviewed')}>
                    <a><img alt='' src="/dashboard/interviewed.png" className={itemImgCls} />面過{filterName==='面過'?selected():''}</a>
                </li>
            </ul>
        </details>
    );
}
