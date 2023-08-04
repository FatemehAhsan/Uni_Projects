import React, {Component} from 'react';
import {Link} from "react-router-dom";

class ShopNav extends Component {

    render() {
        return (
            (
                <div class="shop-panel">
                    <div class="shop-panel-item active-item">
                        <Link to={{
                            pathname: "/shop"
                        }}>
                            <svg stroke="currentColor" color="white" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                 stroke-linecap="round" stroke-linejoin="round" height="35px" width="35px"
                                 xmlns="http://www.w3.org/2000/svg">
                                <circle cx="9" cy="21" r="1"></circle>
                                <circle cx="20" cy="21" r="1"></circle>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                            </svg>
                        </Link>
                        <div class="shop-panel-item-name">
                            فروشگاه
                        </div>
                    </div>
                    <div class="shop-panel-item">
                        <Link to={{
                            pathname: "/shopowneraccount"
                        }}>
                            <svg stroke="currentColor" color="#333333" fill="none" stroke-width="2" viewBox="0 0 24 24"
                                 stroke-linecap="round" stroke-linejoin="round" height="35px" width="35px"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </Link>
                        <div class="shop-panel-item-name">
                            حساب من
                        </div>
                    </div>
                </div>
            )
        )
    }
}

export default ShopNav
