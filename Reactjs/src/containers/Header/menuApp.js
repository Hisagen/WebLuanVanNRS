export const adminMenu = [
    { //hệ thống
        name: 'menu.admin.manage-vienchuc',
        menus: [
            // { name: 'menu.admin.crud', link: '/system/vienchuc-manage' },
            { name: 'Quản lý Viên Chức', link: '/system/vienchuc-redux' },
            { name: 'Quản Lý Tỉnh Thành', link: '/system/tinhthanh-manage' },
            { name: 'Quản Lý Huyện Quận', link: '/system/huyenquan-manage' },
            { name: 'Quản Lý Xã Phường', link: '/system/xaphuong-manage' },
            { name: 'Quản Lý Nhà Sản Xuất ', link: '/system/nhasx-manage' },
            { name: 'Quản Lý Hoạt Chất', link: '/system/hoatchat-manage' },
            { name: 'Quản Lý Thuốc', link: '/system/thuoc-manage' },
            { name: 'Quản Lý Trình Độ Học Vấn', link: '/system/tdhv-manage' },
            { name: 'Quản Lý Chức Vụ', link: '/system/chucvu-manage' },
            { name: 'Quản lý Chuyên Khoa', link: '/system/chuyenkhoa-redux' },
            { name: 'Quản Lý Phòng', link: '/system/phong-manage' },
            { name: 'Quản Lý Buổi', link: '/system/buoi-manage' },
            // { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            // { name: 'Quản lý lịch khám', link: '/system/schedule-manage' },
            // { name: 'menu.admin.manage-admin', link: '/system/manage-admin' },
            // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        ]
    },
    // { //Phòng khám
    //     name: 'menu.admin.clinic',
    //     menus: [
    //         { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
    //         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    //     ]
    // },
    // { //chuyên khoa
    //     name: 'menu.admin.specialty',
    //     menus: [
    //         { name: 'menu.admin.manage-specialty', link: '/system/manage-specialty' },
    //         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    //     ]
    // },
    // { //cẩm nang
    //     name: 'menu.admin.handbook',
    //     menus: [
    //         { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
    //         // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    //     ]
    // },
];

export const schedulerMenu = [
    { //quản lý kế hoạch khám bệnh của bác sĩ
        name: 'Quản lý lịch khám',
        menus: [
            // { name: 'Quản lý lịch khám chuyên khoa Thần Kinh', link: '/system/schedule-manage' },
            { name: 'Thần Kinh', link: '/schedule/schedule-thankinh-manage' },
            { name: 'Cơ Xương Khớp', link: '/schedule/schedule-coxuongkhop-manage' },
            { name: 'Tiêu Hóa', link: '/schedule/schedule-tieuhoa-manage' },
            { name: 'Tim mạch', link: '/schedule/schedule-timmach-manage' },
            { name: 'Tai Mũi Họng', link: '/schedule/schedule-taimuihong-manage' } 

        ]
    },
];

export const doctorMenu = [
    { //quản lý kế hoạch khám bệnh của bác sĩ
        name: 'Quản lý lịch đăng ký khám và khám',
        menus: [
            // { name: 'Quản lý lịch khám chuyên khoa Thần Kinh', link: '/system/schedule-manage' },
            // { name: 'Xem lịch khám', link: '/system/doctor-schedule' },
            { name: 'Quản lý lịch đăng ký khám', link: '/doctor/doctor-manage-patient' },
            { name: 'Quản lý danh sách bệnh nhân đã khám', link: '/doctor/doctor-manage-patient1' },
            { name: 'Xem lịch khám', link: '/doctor/xem-lich-kham' },
        ]
    },
];