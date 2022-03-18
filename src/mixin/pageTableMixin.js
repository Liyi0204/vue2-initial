import Paging from "ASSETS/js/query/Paging"
import SearchConfig from "ASSETS/js/query/SearchConfig"

export default {
  data() {
    return {      
      tableData: [],
      searchInfo: {},
      items: {}, // 设置某个参数的搜索方法 like 模糊 eq 完全
      pageInfo: Paging.createNew(),
      sorts: {}
    }
  },
  computed: {
    queryParams() {
      let params = Object.assign({}, this.searchInfo, this.pageInfo);
      return params
    },
    searchConfig() {
      return SearchConfig.createNew({
        searchForm: this.searchInfo,
        items: this.items,
        sorts: this.sorts
      })
    }
  },
  mounted() {
    this.loadTableData()
  },
  methods: {
    searchData() {
      this.pageInfo.pageNo = 1
      this.loadTableData()
    },

    clearPage() {
      this.tableData = []
      this.pageInfo = Paging.createNew()
    },
    querySuccess(data) {
      //console.log(data)
      this.tableData = data.list;
      this.pageInfo.total = data.total;
      if (this.$refs.pageTable) {
        this.$refs.pageTable.tableLoading = false;
      }
    }
  }
}
