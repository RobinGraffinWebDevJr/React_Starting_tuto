import { render } from 'react-dom';

const PRODUCTS = [
    { category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" },
    { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" },
    { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" },
    { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" },
    { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" },
    { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }
];

function ProductRow({ product }) {
    return <tr>
        <td>{product.name}</td>
        <td>{product.price}</td>
    </tr>
}

function ProductCategoryRow({ category }) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductTable({ products }) {
    const rows = []
    let lastCategory = null

    products.forEach(product => {
        if (product.category !== lastCategory) {
            lastCategory = product.category
            rows.push(<ProductCategoryRow category={product.category} />)
        }
        rows.push(<ProductRow product={product} />)
    })

    return <table className="table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
}

class FilterableProductTable extends React.Component {

    render() {
        const { products } = this.props
        return <ProductTable products={products} />
    }
}

const root = createRoot(document.getElementById('app'));
root.render(<FilterableProductTable products={PRODUCTS} />);
