import React from "react";
import {Link} from 'react-router-dom';

const Footer = function(){
    return (
        <div>
              <footer class="main-footer">
                <div class="float-right d-none d-sm-block">
                <b>Version</b> 3.2.0
                </div>
                <strong>Copyright &copy; 2014-2021 <Link href="https://adminlte.io">AdminLTE.io</Link>.</strong> All rights reserved.
            </footer>


            <aside class="control-sidebar control-sidebar-dark">
            
            </aside>
        </div>
    )
}

export default Footer;