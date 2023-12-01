import React from "react";

const ContactInfo = () => {
  return (
    <div className="contactInfo container">
      <div className="row">
        <div className="col-12 col-md-6 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-phone-alt"></i>
            </div>
            <h5>Liên hệ hợp tác </h5>
            <p>0981 922 824</p>
            <p>nghoaii21@gmail.com</p>
          </div>
        </div>
        <div className="col-12 col-md-6 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <h5>Địa chỉ</h5>
            <p>Quyết Tháng, Thái Nguyên</p>
            <p>Thành phố Thái Nguyên</p>
          </div>
        </div>
        {/* <div className="col-12 col-md-4 contact-Box">
          <div className="box-info">
            <div className="info-image">
              <i className="fas fa-fax"></i>
            </div>
            <h5>Liên hệ hợp tác</h5>
            <p>0981 922 824</p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ContactInfo;
