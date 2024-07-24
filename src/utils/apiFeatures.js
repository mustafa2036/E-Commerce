
// return this علشان => function chan
export class ApiFeatures {

    constructor(monogoseQuery, searchQuery) {
        this.monogoseQuery = monogoseQuery
        this.searchQuery = searchQuery
    }

    pagination () {
        let pageNumber = this.searchQuery.page * 1 || 1
        if(this.searchQuery.page < 0 ) pageNumber = 1
        const limit = 2;
        let skip = (pageNumber - 1) * limit;
        this.monogoseQuery.skip(skip).limit(limit)
        return this;
    }

    filter () {
        let filterObj = structuredClone(this.searchQuery);
        filterObj = JSON.stringify(filterObj)
        filterObj = filterObj.replace(/(gt|gte|lt|lte)/g, value => `$${value}`)
        filterObj = JSON.parse(filterObj)

        let filterFields = ['page', 'sort', 'fields', 'search']
        filterFields.forEach(val => {
            delete filterObj[val]
        })
        this.monogoseQuery.find(filterObj)
        return this
    }

    sort () {
        if(this.searchQuery.sort) {
            let sortedBy = this.searchQuery.sort.split(',').join(' ')
            this.monogoseQuery.sort(sortedBy)
        }
        return this;
    }

    fields () {
        if(this.searchQuery.fields) {
            let selectedFields = this.searchQuery.fields.split(',').join(' ')
            this.monogoseQuery.select(selectedFields)
        }
        return this
    }

    search () {
        if(this.searchQuery.search) {
            this.monogoseQuery.find(
                {
                    $or: [
                        { title: {$regex: this.searchQuery.search, $options: 'i'} },
                        { decription: {$regex: this.searchQuery.search, $options: 'i'} },
                    ]
                }
            )
        }
        return this
    }
}