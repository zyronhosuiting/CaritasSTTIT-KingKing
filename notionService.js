// notionService.js
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: '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',
});

export const fetchBlogPosts = async () => {
  const databaseId = 'cdb04ee5337a486db06e3de5db2ee93e';
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      filter: {
        property: 'Status',
        select: {
          equals: 'Published',
        },
      },
      sorts: [
        {
          property: 'Published Date',
          direction: 'descending',
        },
      ],
    });
    // console.log('完整的响应：', JSON.stringify(response, null, 2));
    return response.results.map(page => ({
      id: page.id,
      title:
        page.properties['Title']?.title?.[0]?.plain_text || 'Untitled Title',
      tag: page.properties['Tag']?.multi_select?.map(tag => tag.name) || [
        'Untitled tag',
      ],
      publishedDate: page.properties['Published Date'].date.start || 'No date',
      url: page.url,
    }));
  } catch (error) {
    console.error('获取博客文章时出错：', error);
    console.error(
      '错误详情：',
      error.response ? error.response.body : error.message,
    );
    return [];
  }
};
