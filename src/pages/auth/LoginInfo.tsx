import {useRef, useState} from 'react'
import {autoSignIn, confirmSignIn, confirmSignUp, signIn, signUp} from 'aws-amplify/auth'
import {Link, useNavigate} from 'react-router-dom';
import {employerService} from "../../api/employerService.ts";
import {handleErrorWithMessage} from "../../api/utils.ts";
import {useEmployerStore, useJobStore} from "../../stores/useStore.ts";
import {Employer, Job} from "../../entity.ts";
import {jobService} from "../../api/jobService.ts";

interface LoginInfoProps {
    type?: string
}

enum AuthType {
    login = 'login', register = 'register'
}

export default function LoginInfo({type}: LoginInfoProps) {
    const authType: AuthType = type === 'login' ? AuthType.login : AuthType.register;
    const navigate = useNavigate();
    const [number, setNumber] = useState('')
    const [verificationCode, setVerificationCode] = useState('')
    const [isShowPhoneError, setIsShowPhoneError] = useState(false)
    const [isShowVerificationError, setIsShowVerificationError] = useState(false)
    const [isAgree, setIsAgree] = useState(false)
    const refModal = useRef(null);
    const setEmployer = useEmployerStore((state) => state.setEmployer)
    const setJob = useJobStore((state) => state.setJob);
    const title = (authType === AuthType.login ? '登陸' : '註冊');

    function checkPhoneNumber() {
        // 验证手机号格式
        const phoneNumberPattern = /^\d+$/;
        if (!phoneNumberPattern.test(number)) {
            // alert('請輸入有效的8位手機號.');
            console.log('number false')
            setIsShowPhoneError(true)
            return false;
        }
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

    /* 点击 发送验证码 */
    async function onClickSendVerificationCode() {
        if (!checkPhoneNumber()) {
            return;
        }
        if (authType === AuthType.login) {
            await signInStepOne();
        } else if (authType === AuthType.register) {
            try {
                await signUpStepOne();
            } catch (error) {
                if (error instanceof Error && error.name === 'UsernameExistsException') {
                    alert('此手機號已被註冊.')
                } else {
                    alert(JSON.stringify(error))
                }
            }
        }
    }

    // 点击 注册/登陆
    async function onClickFinishButton() {
        if (!(checkPhoneNumber() && checkVerificationCode())) {
            return;
        }
        if (!isAgree) {
            // @ts-expect-error none
            refModal.current.showModal();
            return;
        }
        if (authType === AuthType.login) {
            await loginStepTwo();
        } else if (authType === AuthType.register) {
            try {
                await signUpStepTwo();
            } catch (e) {
                if (e instanceof Error) {
                    if (e.name === 'ExpiredCodeException') {
                        alert('无效的验证码!')
                    }
                } else {
                    alert(JSON.stringify(e))
                }
            }
        }
    }

    // 用户注册 1. 輸入手機號，點擊發送驗證碼
    async function signUpStepOne() {
        const {nextStep: signUpNextStep} = await signUp({
            username: "+852" + number,
            options: {
                userAttributes: {
                    phone_number: "+852" + number,
                },
                autoSignIn: {
                    authFlowType: 'USER_AUTH',
                },
            }
        })
        if (signUpNextStep.signUpStep === 'CONFIRM_SIGN_UP') {
            alert('短信已發送，請注意查收.')
            console.log(
                `Code Delivery Medium: ${signUpNextStep.codeDeliveryDetails.deliveryMedium}`,
            );
            console.log(
                `Code Delivery Destination: ${signUpNextStep.codeDeliveryDetails.destination}`,
            );
        } else {
            alert('注册返回未处理代码： ' + signUpNextStep.signUpStep)
        }
    }

    // 用户注册 2. 輸入驗證碼，點擊注册
    async function signUpStepTwo() {
        const {nextStep: confirmSignUpNextStep} = await confirmSignUp({
            username: "+852" + number,
            confirmationCode: verificationCode,
        });
        if (confirmSignUpNextStep.signUpStep === 'COMPLETE_AUTO_SIGN_IN') {
            const {nextStep} = await autoSignIn();
            if (nextStep.signInStep === 'DONE') {
                //注册成功，创建雇主实体
                const employer = await employerService.signupInit("+852" + number)
                if (!employer) {
                    handleErrorWithMessage(null, "注册失败,请联系管理员。signUpStepTwo");
                    return;
                }
                const job = await jobService.create(employer.id!)
                if (!job) {
                    handleErrorWithMessage(null, "注册失败,请联系管理员。signUpStepTwo");
                    return
                }
                setEmployerState(employer, job)
                alert('注册成功！');
                navigate('/dashboard')
            }
        } else if (confirmSignUpNextStep.signUpStep === 'DONE') {
            navigate('/login')
        } else {
            alert('出錯了！')
            console.log('Error. confirmSignUpNextStep.signUpStep: ' + confirmSignUpNextStep.signUpStep)
        }
    }

    // 用户登陆 1. 輸入手機號，點擊發送驗證碼
    async function signInStepOne() {
        const {nextStep: signInNextStep} = await signIn({
            username: "+852" + number,
            options: {
                authFlowType: 'USER_AUTH',
                preferredChallenge: 'SMS_OTP',
            }
        })
        //TODO 若用户未注册，但在登陆界面点击发送验证码，这种情况下不会收到短信，是否需要先检查用户是否存在？若无消息提示，用户可能会感到困惑
        if (signInNextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_SMS_CODE') {
            alert('短信已發送，請注意查收.')
        } else {
            console.dir(signInNextStep);
            alert('登陆返回未处理代码： ' + signInNextStep.signInStep)
        }
    }

    // 用户登陆 2. 輸入驗證碼，點擊注册
    async function loginStepTwo() {
        const {nextStep: confirmSignInNextStep} = await confirmSignIn({
            challengeResponse: verificationCode,
        });
        if (confirmSignInNextStep.signInStep === 'DONE') {
            //登陸成功，创建雇主实体
            const employer = await employerService.getCurrentEmployer("+852" + number)
            if (!employer) {
                handleErrorWithMessage(null, "登陸失败,请联系管理员。signUpStepTwo");
                return;
            }
            setEmployerState(employer, employer.job)
            alert('注册成功！');
            navigate('/dashboard')
            navigate('/dashboard')
        } else {
            alert('出錯了！')
            console.log('Error. confirmSignInNextStep.signInStep: ' + confirmSignInNextStep.signInStep)
        }
    }

    function setEmployerState(employer: Employer, job?: Job) {
        setEmployer(employer)
        if (job) {
            setJob(job)
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
                        onClick={() => onClickSendVerificationCode()}>發送驗證碼
                </button>
            </div>
            <div className="h-0">
                {(isShowVerificationError ?
                    <div className="w-[487px] float-left text-primary mt-1 ml-2"><p>請輸入驗證碼</p></div> : null)}
            </div>
            {(authType === AuthType.register ?
                <img src='/login/registry_steps_two.png' alt="findcare" className="my-4"></img> : null)}
            <div className="flex flex-row mt-8 w-[487px] justify-items-center">
                <button className="btn bg-primary border-0 text-xl text-white w-full font-medium h-14"
                        onClick={() => onClickFinishButton()}>{title}
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
