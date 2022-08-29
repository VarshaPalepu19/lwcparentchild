import { LightningElement ,track} from 'lwc';
import img1 from '@salesforce/resourceUrl/AutoForce';
export default class ParentCmp extends LightningElement {
    searchValue='';
    strName;
    strEmail;
    strPhone;
    searchEmail='';
    visible=false;
   image1=img1;
   @track totalsum;
   accountsLength;
   disabled=false;
   @track customFormModal = false;
   @track length1;
   @track length2;
   @track length3;
   enable=false;
   get disableButton(){
    return !(this.searchValue || this.searchEmail || this.searchPhone);
}

closeModal() {
    this.customFormModal = false;
}
CurrentRecord() {
    //console.log(JSON.stringify(currentRow));
    this.customFormModal = true;
    //this.isEditForm = true;
    // assign record id to the record edit form
    //this.currentRecordId = currentRow.Id;
    console.log(this.currentRecordId);
}
handleCustomEvent1(event) {
    const textVal1 = event.detail;
    this.length1 = textVal1;
    console.log("len1",this.length1);
}
handleCustomEvent2(event) {
    const textVal2 = event.detail;
    this.length2 = textVal2;
    console.log("len2",this.length2);
}
handleCustomEvent3(event) {
    const textVal3 = event.detail;
    this.length3 = textVal3;
    console.log("len3",this.length3);
}
get total(){
    return (this.length1+this.length2+this.length3);
}
check(){
    if(this.length1==0 && this.length2==0 && this.length3==0){
        this.enable=true;
    }
}
    handleSearchKeyword(event) {
        this.CurrentRecord();
        console.log("reached handlesearch");
        const objChild = this.template.querySelector('c-child-cmp');
        this.visible=true;
        this.enable=false;
        //this.accountsLength;
        //console.log("hello",this.accountsLength);
        //objChild.handleAccounts(this.searchValue,this.searchEmail,this.searchPhone);
        //this.template.querySelector("c-child-cmp").handleAccounts(this.searchValue,this.searchEmail,this.searchPhone);
        console.log("handleaccounts reached");
        //objChild.visible();

        const objChild1 = this.template.querySelector('c-child-cmp1');
        //objChild1.handleContacts(this.searchValue,this.searchEmail,this.searchPhone);
				this.visible=true;
                this.enable=false;
				console.log("handlecontacts reached");

        const objChild2 = this.template.querySelector('c-child-cmp2');
				this.visible=true;
                this.enable=false;
				console.log("handleleads reached");
        //objChild2.handleLeads(this.searchValue,this.searchEmail,this.searchPhone);
        const objChild3=this.template.querySelector('c-create-cmp');
        objChild3.LeadCreated();
        //this.total=this.accountsLength;
        //console.log("total",this.total);
    }
    searchkey(event) {
        this.searchValue = event.target.value;
        console.log("name",this.searchValue);
    }
    searchkeyEmail(event) {
        this.searchEmail = event.target.value;
        console.log("email",this.searchEmail);
    }
    searchkeyPhone(event) {
        this.searchPhone = event.target.value;
        console.log("phone",this.searchPhone);
    }
    /*get disableButton(){
        return!(this.searchValue==' ' || this.searchEmail==' '|| this.searchPhone==' ');
        
    }*/
}