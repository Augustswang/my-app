import React from 'react';

export default function NavBar(props) {
    return( 
        <div className='blockNav'>
        <nav class="navbar navbar-expand-sm navbar-light bg-light fixed-top">
        <div class="container-fluid">
         <a class="navbar-brand" href="#"></a>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
           <ul class="navbar-nav">
            <li class="nav-item">
             <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
             <a class="nav-link" href="#">Lego Product</a>
            </li>  
            <li class="nav-item">
             <a class="nav-link" href="#">Shopping Cart</a>
            </li> 
            <li class="nav-item">
              <a class="nav-link" href="#">Contract Us</a>
            </li> 
        </ul>
      </div>
    </div>
  </nav>
  </div>

    );
}