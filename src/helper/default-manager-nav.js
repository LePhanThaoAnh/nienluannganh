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
                name: "Quản lý phòng",
                icon: "bi bi-journal",
                url: "",
                children: []
            },
            {
                name: "Quản lý đặt phòng",
                icon: "bi bi-journal-text",
                url: "",
                children: []
            },
            {
                name: "Quản lý sự kiện",
                icon: "bi bi-calendar-event",
                url: "",
                children: []
            },
            {
                name: "Quản lý người dùng",
                icon: "bi bi-person-circle",
                url: "#",
                children: [
                    {
                        name: "Quản lý nhân viên",
                        icon: "bi bi-circle",
                        url: "",
                        children: []
                    },
                    {
                        name: "Quản lý khách hàng",
                        icon: "bi bi-circle",
                        url: "",
                        children: []
                    },
                ]
            },
            {
                name: "Quản lý đánh giá",
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