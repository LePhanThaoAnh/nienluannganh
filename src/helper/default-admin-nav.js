module.exports = () =>{
    return  {
        navTabs:[
            {
                name: "Bảng điều khiển",
                icon: "bi bi-gear-wide",
                url: "",
                children: []
            },
            {
                name: "Quản lý khách sạn",
                icon: "bi bi-journal",
                url: "administrator/hotel",
                children: []
            },
            {
                name: "Quản lý dịch vụ",
                icon: "bi bi-journal-text",
                url: "administrator/",
                children: []
            },
            {
                name: "Quản lý loại phòng",
                icon: "bi bi-calendar-event",
                url: "",
                children: []
            },
            {
                name: "Quản lý lựa chọn",
                icon: "bi bi-star",
                url: "",
                children: []
            },
            {
                name: "Đăng xuất",
                icon: "bi bi-box-arrow-left",
                url: "",
                children: []
            },
        ]
    }
}