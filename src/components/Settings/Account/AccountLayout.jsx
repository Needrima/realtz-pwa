import React, { useContext } from 'react'
import './Account.scss'
import proceedIcon from '../../../assets/icons/proceed-icon.svg'
import { useNavigate } from 'react-router-dom'
import { Checkbox, Drawer, Form } from 'antd'
import { accountContext } from '../../../pages/Settings/Account/Account'
import CustomSpin from '../../UI/CustomSpin/CustomSpin'
import { BVN_REGEX } from '../../../misc/regex'

const AccountLayout = () => {
    const navigate = useNavigate()
    const {deleteAccountBoxOpen, openDeleteAccountBox, deleteAccountConsent, onDeleteAccountConsent, deleteAccountConsentForm, deletingAccount, deleteAccount,
      switchAccountBoxOpen, switchAccountConsent, switchAccountConsentForm, switchingAccount, openSwitchAccountBox,onSwitchAccountConsent,
      switchAccount} = useContext(accountContext);
  return (
    <div className='p-2'>
        <h1 className='fw-bold text-primary mt-3 text-center mb-5'>Account</h1>

        <div className='options rounded py-4 px-2'>
            <div className='d-flex justify-content-between align-items-center mb-4' onClick={() => navigate("/settings/account/user-information")}>
                <span className='fs-4'>User Information</span>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4'>
                <span className='fs-4'>Password</span>
                <img src={proceedIcon} alt="" />
            </div>

            <div className='d-flex justify-content-between align-items-center mb-4' onClick={() => openSwitchAccountBox(true)}>
                <span className='fs-4'>Switch To Agent Account</span>
                <img src={proceedIcon} alt="" />
            </div>

            {/* <div className='d-flex justify-content-between align-items-center mb-4'>
                <span className='fs-4'>Deactivate Account</span>
                <img src={proceedIcon} alt="" />
            </div> */}

            <div className='d-flex justify-content-between align-items-center' onClick={() => openDeleteAccountBox(true)}>
                <span className='fs-4'>Delete Account</span>
                <img src={proceedIcon} alt="" />
            </div>
        </div>

        {/* drawer to switch to agent account  */}
        <Drawer
            open={switchAccountBoxOpen}
            title={<div className='text-primary fw-bold'>Switch To Agent Account</div>}
            // footer={} // react node
            placement="bottom"
            height={"auto"}
            closable={!switchingAccount}
            maskClosable={!switchingAccount}
            onClose={() => openSwitchAccountBox(false)}
        >
            <Form 
             form={switchAccountConsentForm[0]}
             onFinish={() => switchAccount()}
             autoComplete="off"
             >

            <Form.Item
              name="bvn"
              rules={[
                { required: true, message: "BVN is required" },
                { whitespace: true, message: "BVN cannot be empty" },
                {
                  async validator(rule, value) {
                    if (BVN_REGEX.test(value)) return Promise.resolve();
                    return Promise.reject(
                      new Error(
                        "BVN must be valid 11 digits BVN e.g 11223344556"
                      )
                    );
                  },
                  validateTrigger: "onChange",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="BVN"
                className="text-input"
              />
            </Form.Item>

            <Form.Item
              name="switch_account_agreement"
              valuePropName="checked"
              rules={[
                {required: true, message: "you must confirm to switch account"},
              ]}
            >
              <Checkbox
                onChange={(e) => onSwitchAccountConsent(e.target.checked)}
                defaultChecked={switchAccountConsent}
                value={switchAccountConsent}
              >
                I agree that my account type will be switched to an agent account and this action is not reversible
              </Checkbox>
            </Form.Item>

            <div className='text-center'>
                <button className="btn btn-primary me-2"
                 type='submit'
                 disabled={!switchAccountConsent || switchingAccount}
                >{switchingAccount ? <CustomSpin color={'white'} /> : 'Switch Account'}</button>
                
                <button className="btn btn-primary"
                type='button'
                 onClick={() => openSwitchAccountBox(false)} 
                 disabled={switchingAccount}
                >Cancel</button>
            </div>
          </Form>
        </Drawer>
        
        {/* drawer to switch to delete account  */}
        <Drawer
            open={deleteAccountBoxOpen}
            title={<div className='text-primary fw-bold'>Delete Account</div>}
            // footer={} // react node
            placement="bottom"
            height={"auto"}
            closable={!deletingAccount}
            maskClosable={!deletingAccount}
            onClose={() => openDeleteAccountBox(false)}
        >
            <Form 
            form={deleteAccountConsentForm[0]}
             onFinish={() => deleteAccount()}
             autoComplete="off"
             >

            <Form.Item
              name="delete_Account_agreement"
              valuePropName="checked"
              rules={[
                {required: true, message: "you must confirm information accuracy"},
              ]}
            >
              <Checkbox
                onChange={(e) => onDeleteAccountConsent(e.target.checked)}
                defaultChecked={deleteAccountConsent}
                value={deleteAccountConsent}
              >
                I agree that all my information, activities and records will be deleted and this action is not reversible
              </Checkbox>
            </Form.Item>

            <div className='text-center'>
                <button className="btn btn-primary me-2"
                 type='submit'
                 disabled={!deleteAccountConsent || deletingAccount}
                >{deletingAccount ? <CustomSpin color={'white'} /> : 'Delete Account'}</button>
                
                <button className="btn btn-primary"
                type='button'
                 onClick={() => openDeleteAccountBox(false)} 
                 disabled={deletingAccount}
                >Cancel</button>
            </div>
          </Form>
        </Drawer>
    </div>
  )
}

export default AccountLayout