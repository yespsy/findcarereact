import {useRef, useState} from 'react'
import {confirmSignIn, signIn} from 'aws-amplify/auth'
import {Link} from 'react-router-dom';

interface LoginInfoProps {
    type?: string
}

export default function LoginInfo({type}: LoginInfoProps) {
    // const router = useRouter()
    const [number, setNumber] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [isShowPhoneError, setIsShowPhoneError] = useState(false)
    const [isShowVerificationError, setIsShowVerificationError] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const refModal = useRef(null);

    const title = (type === 'login' ? '登陸' : '註冊');

    function checkPhoneNumber() {
        // 验证手机号格式
        const phoneNumberPattern = /^\d+$/;
        console.log(number.length)
        if (!phoneNumberPattern.test(number)) {
            // alert('請輸入有效的8位手機號.');
            console.log('number false')
            setIsShowPhoneError(true)
            return false;
        }
        console.log('number true')
        setIsShowPhoneError(false)
        return true;
    }

    function checkVerificationCode() {
        if (verificationCode.trim().length < 1) {
            setIsShowVerificationError(true)
            return false;
        }
        setIsShowVerificationError(false)
        return true;
    }

    async function sendVerificationCode() {
        if (!checkPhoneNumber()) {
            return;
        }
        console.log('--- sendVerificationCode')
        const {nextStep: signInNextStep} = await signIn({
            username: "+852" + number,
            options: {
                authFlowType: 'USER_AUTH',
                preferredChallenge: 'SMS_OTP',
            }
        })
        // if (signInNextStep.signInStep === 'CONTINUE_SIGN_IN_WITH_FIRST_FACTOR_SELECTION') {
        //     const {nextStep: confirmSignInNextStep} = await confirmSignIn({
        //         challengeResponse: verificationCode,
        //     });
        //     console.dir(confirmSignInNextStep);
        // }
        if (signInNextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
            alert('短信已發送，請注意查收.')
        } else {
            console.dir(signInNextStep);
        }
    }

    async function confirmSignInNextStep() {
        if (!(checkPhoneNumber() && checkVerificationCode())) {
            return;
        }
        if (!isAgree) {
            // @ts-expect-error none
            refModal.current.showModal();
            return;
        }

        const {nextStep: confirmSignInNextStep} = await confirmSignIn({
            challengeResponse: verificationCode,
        });
        if (confirmSignInNextStep.signInStep === 'DONE') {
            //TODO router.push('/dashboard')
        } else {
            alert('出錯了！')
            console.log('Error. confirmSignInNextStep.signInStep: ' + confirmSignInNextStep.signInStep)
        }
    }

    function agree(v: boolean) {
        setIsAgree(v)
    }

    return (
        <>
            <div className="flex flex-row border-2 rounded-xl mt-8 w-[487px] py-1">
                <select className="select max-w-fit text-xl bg-white">
                    <option defaultChecked>+852</option>
                </select>
                <input type="text" placeholder="手機號" className="input w-full bg-white text-xl"
                       value={number} onChange={e => setNumber(e.target.value)}/>
            </div>
            <div className="h-0">
                {(isShowPhoneError ?
                    <div className="w-[487px] float-left text-primary mt-1 ml-2"><p>請輸入有效的手機號</p>
                    </div> : null)}
            </div>
            <div className="flex flex-row border-2 rounded-xl mt-8 w-[487px] py-1">
                <input type="text" placeholder="短信驗證碼" className="input w-full bg-white text-xl mr-9"
                       value={verificationCode} onChange={e => setVerificationCode(e.target.value)}/>
                <button className="btn bg-white border-0 text-xl text-primary font-medium pr-6"
                        onClick={() => sendVerificationCode()}>發送驗證碼
                </button>
            </div>
            <div className="h-0">
                {(isShowVerificationError ?
                    <div className="w-[487px] float-left text-primary mt-1 ml-2"><p>請輸入驗證碼</p></div> : null)}
            </div>
            {(type === 'register' ? <img src='../../../public/login/registry_steps_two.png' alt="findcare" className="my-4"></img> : null)}
            <div className="flex flex-row mt-8 w-[487px] justify-items-center">
                <button className="btn bg-primary border-0 text-xl text-white w-full font-medium h-14"
                        onClick={() => confirmSignInNextStep()}>{title}
                </button>
            </div>
            <div className="flex flex-col w-[487px] justify-center mt-36">
                <div className="flex justify-center">
                    <input type="checkbox" className="checkbox checked:checkbox-primary" checked={isAgree}
                           onChange={() => setIsAgree(!isAgree)}/>
                    <p className="text-nowrap text-base ml-3 text-gray-400">已閱讀並同意搜護綱</p>
                    <p className="text-primary text-nowrap text-base">《用戶協議》《隱私政策》</p>
                    <p className="text-nowrap text-base text-gray-400">，允許</p>
                </div>
                <p className="flex justify-center text-gray-400">搜護綱統一管理本人賬號信息</p>
            </div>
            <dialog id="my_modal_1" className="modal" ref={refModal}>
                <div className="modal-box bg-white">
                    <p className="py-4 text-xl bg-white text-gray-500">請閱讀並同意搜護綱
                        <Link to="/" className="text-primary">《用戶協議》</Link>
                        <Link to="/" className="text-primary">《隱私政策》</Link>，允許搜護綱統一管理本人賬號信息
                    </p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn text-lg font-normal text-primary bg-white mr-5 px-10"
                                    onClick={() => agree(false)}>拒絕
                            </button>
                            <button className="btn text-lg font-normal bg-primary text-white px-10"
                                    onClick={() => agree(true)}>同意
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}
