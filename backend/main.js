const express = require("express");
const cors = require("cors")
const app = express();
app.use(express.static("assets/images"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

let productsData = require('./productsData')

// for getting 10 products page wise
const getPageData = (pageNumber, productTempData) => {
    let productsCount = productTempData.length;
    let pageSize = 10;
    let pageCount = Math.ceil(productsCount / pageSize);
    let page = parseInt(pageNumber)
    if (page < 1) page = 1;
    if (page > pageCount) page = pageCount;
    let startIndex = (page - 1) * pageSize
    let endIndex = page * pageSize
    if (endIndex < 0) { endIndex = 0 };
    let allProducts = productTempData.slice(startIndex, endIndex);
    return { pageCount, allProducts }
}


// sending data page wise
app.get("/rubick", function (req, res) {
    let { pageCount, allProducts } = getPageData(req.query.page, productsData)
    allProducts = [...allProducts.sort((a, b) => ((a['lastUpdated']) < (b['lastUpdated'])) ? 1 : (((b['lastUpdated']) < (a['lastUpdated'])) ? -1 : 0))]
    // console.log(allProducts)
    res.send({ productResults: allProducts, totalpage: pageCount });
})


// deleting data using keys
app.delete('/rubick/delete', function (req, res) {
    var keys = req.body.keys;
    productsData = [...productsData.filter(tempdata => keys.indexOf(tempdata.key) < 0)];
    let { pageCount, allProducts } = getPageData(req.body.currentpage, productsData)
    allProducts = [...allProducts.sort((a, b) => ((a['lastUpdated']) < (b['lastUpdated'])) ? 1 : (((b['lastUpdated']) < (a['lastUpdated'])) ? -1 : 0))]
    res.send({ productResults: allProducts, totalpage: pageCount });
})


// sending all active and inactive states
app.get("/rubick/getscrapes", function (req, res) {

    let active = 0;
    productsData.forEach((item) => {
        if (item.status === true)
            active++
    })
    res.send({ totalProductsData: productsData.length, active: active });
})


// for toggling the state 
app.post('/rubick/toggle', function (req, res) {

    let { state, currentpage, key } = req.body.data
    let keyID = productsData.findIndex((item) => item.key == key)
    productsData[keyID].status = state
    productsData[keyID].lastUpdated = new Date(Date.now());
    let { pageCount, allProducts } = getPageData(currentpage, productsData)

    allProducts = [...allProducts.sort((a, b) => ((a['lastUpdated']) < (b['lastUpdated'])) ? 1 : (((b['lastUpdated']) < (a['lastUpdated'])) ? -1 : 0))]
    res.send({ productResults: allProducts, totalpage: pageCount })
})


// for sorting data for columns other than source and state
app.post('/rubick/sortdata', function (req, res) {
    let { option, column, currentpage } = req.body.data;
    if (option === '1') {
        // console.log(option, column, currentpage)
        let sortedData = productsData.sort((a, b) => (a[column] > b[column]) ? 1 : ((b[column] > a[column]) ? -1 : 0))
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }

    else if (option === '2') {
        // console.log(option, column, currentpage)
        let sortedData = productsData.sort((a, b) => (a[column] < b[column]) ? 1 : ((b[column] < a[column]) ? -1 : 0))
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }
})


// for sorting data for source column
app.post('/rubick/sortsourcedata', function (req, res) {
    let { option, currentpage } = req.body.data;
    if (option === '1') {
        let sortedData = productsData.sort((a, b) => (a['source'].includes('Amazon')) ? -1 : 1)
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }

    else if (option === '2') {
        let sortedData = productsData.sort((a, b) => (a['source'].includes('Flipkart')) ? -1 : 1)
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }

    else if (option === '3') {
        let sortedData = productsData.sort((a, b) => (a['source'].includes('Meesho')) ? -1 : 1)
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }

    else if (option === '4') {
        let sortedData = productsData.sort((a, b) => (a['source'].includes('Myntra')) ? -1 : 1)
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }
})


// for sorting data for state column
app.post('/rubick/sortstatedata', function (req, res) {
    let { option, currentpage } = req.body.data;
    if (option === '1') {
        let sortedData = productsData.sort((a, b) => (a['status'] === true) ? -1 : 1)
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }

    else if (option === '2') {
        let sortedData = productsData.sort((a, b) => (a['status'] === false) ? -1 : 1)
        let { pageCount, allProducts } = getPageData(currentpage, sortedData)
        res.send({ productResults: allProducts, totalpage: pageCount })
    }

})







app.listen(4000, function (err) {
    if (!err) {
        console.log("Server is running at port 4000");
    }
});














