import { Link } from "react-router-dom";

export default function Page() {
    const c = {
        name: 'Mr Hui',
        data: '7 Feb',
        rank: 5,
        title: '搜護網嘅護理員真係好貼心！',
        content: '我妹妹有心理殘疾，佢哋好有耐性，照顧得好周到，仲識得用粵語同我哋溝通，真係好滿意！',
    }
    const c1 = {
        name: 'Mr Hui',
        data: '7 Feb',
        rank: 1,
        title: '搜護網嘅',
        content: '我妹妹有心理殘疾，佢哋好有耐性，照顧得好周到，仲識得用粵語同我哋溝通，真係好滿意！真係好滿意！真係好滿意！真係好滿意！真係好滿意！真係好滿意！真係好滿意！',
    }
    const comments = [c, c1, c, c]

    function commentTd(c: { name: string; data: string; rank: number; title: string; content: string }) {
        return (
            <div className="bg-base-100 rounded-2xl shadow-lg shadow-gray-400 p-5 mt-7">
                <p className="w-[300px] text-2xl font-bold text-nowrap text-ellipsis overflow-hidden ...">{c.title}&nbsp;</p>
                <div className="flex justify-between pt-1">
                    <div>
                        <div className="rating">
                            {
                                Array.from({length: c.rank}).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="orange" viewBox="0 0 24 24"
                                         strokeWidth={1.5} stroke="currentColor" className="size-6 stroke-orange-400">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1
                                        1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204
                                        3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0
                                        0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562
                                        0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"/>
                                    </svg>
                                ))
                            }
                        </div>
                    </div>
                    <div className="flex text-gray-400">
                        <p>{c.data}</p>
                        <p className="ml-2">{c.name}</p>
                    </div>
                </div>
                <p className="pt-2 text-gray-400 h-[75px] text-ellipsis overflow-hidden ...">{c.content}</p>
            </div>
        )
    }

    return (
        <div className="pt-5 mt-8 pb-1 bg-white rounded-xl mr-6 flex justify-around">
            <table className="table-auto w-auto mb-8 mx-4">
                <tbody>
                <tr>
                    <td colSpan={2}>
                        <div className="flex justify-between">
                            <p className="text-2xl font-bold">僱主評價</p>
                            <Link to="/" className="mr-10 text-xl font-bold text-secondary underline-offset-8 underline">查看更多</Link>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td className="w-[350px]">{commentTd(comments[0])}</td>
                    <td className="w-[350px] pl-4">{commentTd(comments[1])}</td>
                </tr>
                <tr>
                    <td>{commentTd(comments[2])}</td>
                    <td className="w-[350px] pl-4">{commentTd(comments[3])}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}
