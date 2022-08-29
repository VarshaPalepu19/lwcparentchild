import { LightningElement, track, api,wire } from 'lwc';
import fetchAccounts from '@salesforce/apex/AccountController.fetchAccounts';
import { NavigationMixin } from 'lightning/navigation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const actions = [
    { label: 'View', name: 'view' },
    { label: 'Edit', name: 'edit' },
];
const columns = [   
    { label: 'Name', fieldName: 'Name' },
    {label: 'Phone', fieldName: 'Phone'},
    {label:'Email', fieldName:'PersonEmail'},
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];
export default class ChildCmp extends NavigationMixin(LightningElement ){
    // Default list of Contacts.
    availableAccounts;
    @api searchValue;
    @api searchEmail;
    @api searchPhone;
    //@api receivedFromParent;
    columns=columns;
    @api visible=false;
    showaccounts=false;
    @api receivedFromP1;
    @api receivedFromP2;
    @api receivedFromP3;
    @api accountsData;
    @api accountsLength;
    @wire( fetchAccounts )  
    wiredAccount( { error, data } ) {
        if ( data ) {
            this.availableAccounts = data;
            console.log("accounts length",this.availableAccounts.length);
            this.visible=true;
            this.error = undefined;
        } else if ( error ) {
            this.error = error;
            this.availableAccounts = undefined;
            this.visible=false;
        }

    }
    /*@api
    get visible(){
      return this.availableAccounts == 'null' ? 'slds-hide':'slds-active';
    }*/
    connectedCallback(){
        console.log("reached to child cmp connectedcallback",this.receivedFromP3);
        this.handleAccounts(this.receivedFromP1,this.receivedFromP2,this.receivedFromP3);
        //this.handleAccounts.data.length;
        //console.log("reached connectedcallback length",this.handleAccounts.data.length);
        this.showaccounts=false;
    }
    @api
    handleAccounts(receivedFromParent,email,phone) {
        console.log('reached to child method ',receivedFromParent);
        console.log('reached to child method ',email);
        console.log('reached to child method ',phone);
        this.searchValue = receivedFromParent;
        this.searchEmail = email;
        this.searchPhone = phone;
        this.showaccounts=false;
        if (this.searchValue !== '' || this.searchEmail!='' || this.searchPhone!='') {
            fetchAccounts({
                    key: this.searchValue,
                    ekey: this.searchEmail,
                    pkey: this.searchPhone
                })
                .then(result => {
                    console.log('results from child for accs',result);
                    console.log("length",result.length);
                    //result=this.accountsLength;
                    this.accountsLength=result.length
                    const accountsEvent = new CustomEvent('accountevent', {
                        detail: this.accountsLength
                    });
                   this.dispatchEvent(accountsEvent)
                   //this.accountsLength=result.length
                    console.log("length acc",this.accountsLength);
                    //this.visible=true;
                    //this.availableAccounts = result;
                    if(result.length>0){
                        this.availableAccounts = result;
                        this.showaccounts=true;
                    }
                })
                .catch(error => {
								console.log("reached to error",error);
                    const event = new ShowToastEvent({
                        title: 'Error',
                        variant: 'error',
                        message:'No records found!',
                    });
                    this.dispatchEvent(event);
                    this.availableAccounts = null;
                });
        }
    }
    handleRowAction1( event ) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;
        switch ( actionName ) {
            case 'view':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        actionName: 'view'
                    }
                });
                break;
            case 'edit':
                this[NavigationMixin.Navigate]({
                    type: 'standard__recordPage',
                    attributes: {
                        recordId: row.Id,
                        objectApiName: 'Account',
                        actionName: 'edit'
                    }
                });
                break;
            default:
        }

    }
    
    
}