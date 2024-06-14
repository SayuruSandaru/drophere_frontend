import React from 'react'
import "react-responsive-modal/styles.css";
import {Modal} from 'react-responsive-modal';
import './payment.css'

interface RespModalProps {
    hasOpen: boolean;
    onCloseModal: () => void;
  }

class RespModal extends React.Component<RespModalProps> {

    render(){
        const {hasOpen, onCloseModal} = this.props;

        return(
            <div>
                
                <Modal classNames={{ modal: 'modal'}} open={hasOpen} onClose={onCloseModal} center >
                <h2 className='hediing'>Add credit or debit card</h2>
                <form>
                    
                    
                    <div>
                    <label>Card Number</label><br/>
                    <input type='text' className='details' placeholder='Card Number' maxLength={16} required/><br/>
                    </div>
                    
                    <div>
                    <label>Cardholder Name</label><br/>
                    <input type='text' className='details' placeholder='Enter Cardholder Name' required/><br/>
                    </div>
                   
                    <div className='flex'>
                    
                    <div>
                    <label className='date'>Expiry Date</label><br/>                 
                    <input type='text' className='box' placeholder='MM/YY' maxLength={5} required/>
                    </div>

                    <div>                    
                    <label className='cvv'>CVV</label><br/>
                    <input type='text' className='box' placeholder='CVV' maxLength={3} required/>
                
                    </div>
                    
                    </div>

                    <div className='logo'>
                        <img src='/images/visa.png' alt='visa' className='icon' id='visa' width={65} />
                        <img src='/images/master.png' alt='mastercard' className='icon' id='master' width={50}/>
                    </div>

                    <div className='btn'>
                    <button type='submit' className='submitbtn'>Pay</button>
                    </div>
                </form>
                </Modal>
            </div>
        )
    }



}  
  

export default RespModal;
