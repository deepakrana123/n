import React from "react";

const Logout = () => {
  return (
    <div>
      <form>
        <div class="modal-content">
          <h4 id="dialog 38-title">Logout</h4>
          <div
            class="modal-content-body"
            style="overflow : auto; max-height:160px;"
          >
            Are you sure?
          </div>
          <input class="modal-content1" type="submit" value="Cancel" />
          <input class="modal-content2" type="submit" value="OK" />
        </div>
      </form>
    </div>
  );
};

export default Logout;
