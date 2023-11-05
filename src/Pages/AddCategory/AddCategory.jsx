
const AddCategory = () => {


    const handleAddCat = (e) => {
        e.preventDefault();
        const form = e.target;
        const catName = form.categoryName.value;

        console.log(catName);
        const newCat = { catName};
        console.log(newCat);

        fetch('http://localhost:5000/addCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCat)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            })
    }
    return (
        <div>
 
            <div>
                <div className="md-container lg:mx-24 md:mx-6 mx-2">
                    <div className=" lg:p-12 md:p-6 p-4 space-y-6">
                        <h2 className="font-rancho text-4xl text-center text-[#374151]">Add New Category</h2>
                        <form onSubmit={handleAddCat} className='lg:w-1/3 md:w-1/2 mx-auto'>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Category Name</span>
                                </label>
                                <label className="input-group">
                                    <input required type="text" name="categoryName" placeholder="Enter Category name" className="input input-bordered w-full" />
                                </label>
                            </div>


                            <input type="submit" value="Add Category" className="w-full mt-6 bg-orange-600 text-white border-black border-2 text-center p-2 font-rancho text-2xl" />
                        </form>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddCategory;