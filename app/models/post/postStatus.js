const postStatuses = {
    DRAFT: 0,
    REVIEW: 1,
    PUBLISHED: 2
}

const statusesAsText = {
    [postStatuses.DRAFT]: 'پیش نویس',
    [postStatuses.REVIEW]: 'در حال بررسی',
    [postStatuses.PUBLISHED]: 'منتشر شده',
}

exports.statuses = () => {
    return postStatuses
}

exports.readableStatuses = (status = null) => {
    return status ? statusesAsText[status] : statusesAsText
}