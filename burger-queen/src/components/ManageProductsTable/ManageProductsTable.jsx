import style from "../ManageProductsTable/ManageProductsTable.module.css";
import iconOptions from "../../assets/icon-options.svg";

const fakeData = [
    { menu: "Breakfast", product: "Sandwich", price: "$5.00" },
    { menu: "Breakfast", product: "Coffee", price: "$2.00" },
    { menu: "Breakfast", product: "Bottle of Water", price: "$1.00" },
    { menu: "Breakfast", product: "Orange Juice", price: "$3.00" },
    { menu: "Lunch/ Dinner", product: "Hamburger", price: "$6.00" },
    { menu: "Lunch/ Dinner", product: "Cheeseburger", price: "$7.00" },
    { menu: "Lunch/ Dinner", product: "Double Burger", price: "$8.00" },
    { menu: "Lunch/ Dinner", product: "Coke", price: "$2.00" },
]

export default function ManageProductsTable(){
    return (
        <>
        <h2 className={style.title}>Manage Products</h2>
        <div className={`table-responsive ${style.responsive}`}>
            <table className="table">
                <thead>
                    <tr>
                        <th>Menu</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {fakeData.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.menu}</td>
                            <td>{val.product}</td>
                            <td>{val.price}</td>
                            <td><img src={iconOptions} className={style.options} /></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
        </>
    )
}