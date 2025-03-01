import {Ref, useImperativeHandle, useRef} from 'react';

export default function Page({ref, headerText = "", closeText = 'Close', size='max-w-fit',children}: {
    ref: Ref<void>, headerText?: string,
    closeText?: string,
    size?: string,
    children?: React.ReactNode,
}) {
    const inputRef = useRef(null);

    useImperativeHandle(ref, () => ({
        show: () => {
            // @ts-expect-error none
            inputRef.current?.showModal();
        }
    }));

    function close() {
        // @ts-expect-error none
        inputRef.current?.close();
    }
    if(!size) size = 'max-w-fit';
    if(size === 'full') size = 'max-w-full';
    if(size === 'fit') size = 'max-w-fit';
    if(size === 'auto') size = 'max-w-auto';

    const modalBoxClassName = `modal-box flex-col ${size}`
    return (
        <>
            <dialog className="modal" ref={inputRef}>
                <div className={modalBoxClassName}>
                    <div>
                        <div className="font-bold text-xl">{headerText}</div>
                    </div>
                    <div className="pt-2">
                        {children}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={() => close()}
                                className="btn bg-primary hover:bg-secondary text-white text-lg">{closeText}</button>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </>
    );
}
