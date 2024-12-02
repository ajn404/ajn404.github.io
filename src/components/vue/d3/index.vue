<template>
    <div class="container">
        <div class="toolbar" v-if="!props.readonly">
            <button @click="undo" :disabled="!canUndo" title="快捷键: Ctrl/Command + Z">
                撤销
            </button>
            <button @click="redo" :disabled="!canRedo" title="快捷键: Ctrl/Command + Shift + Z">
                重做
            </button>
            <button @click="clearShapes">清空图形</button>
            <button @click="downloadImage">下载图形</button>
            <div style="margin-top: 10px;">
                <input v-model="polygonName" placeholder="输入多边形名称" />
                <div class="color-picker">
                    <div class="color-option" v-for="(color, index) in colors" :key="index"
                        :style="{ backgroundColor: color.value }" :class="{ active: selectedColor === color.value }"
                        @click="selectedColor = color.value" :title="color.label">
                    </div>
                </div>
                <button @click="saveShapes" type="submit">保存图形</button>
            </div>
            <div style="margin-top: 10px;">
                <button @click="alignShapes('left')" :disabled="!canAlign">左对齐</button>
                <button @click="alignShapes('center')" :disabled="!canAlign">居中对齐</button>
                <button @click="alignShapes('right')" :disabled="!canAlign">右对齐</button>
                <button @click="alignShapes('top')" :disabled="!canAlign">顶部对齐</button>
                <button @click="alignShapes('middle')" :disabled="!canAlign">垂直居中</button>
                <button @click="alignShapes('bottom')" :disabled="!canAlign">底部对齐</button>
            </div>
            <div class="shortcuts-tips">
                <p>快捷键提示：</p>
                <ul>
                    <li>撤销：Ctrl/Command + Z</li>
                    <li>重做：Ctrl/Command + Shift + Z</li>
                    <li>删除：Backspace/Delete</li>
                </ul>
            </div>
        </div>
        <div ref="chartContainer" class="chart-container"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import * as d3 from 'd3';

const chartContainer = ref(null);
const points = ref([]); // Stores the vertices of the polygon
const polygonName = ref(''); // Stores the name of the polygon
let drawing = false;

// Undo and redo stacks
const undoStack = ref([]);
const redoStack = ref([]);

// 添加新的 ref 来存储所有多边形
const savedPolygons = ref([]);

// 添加颜色选项
const colors = [
    { label: '低风险', value: '#1E90FF' },    // 蓝色
    { label: '一般风险', value: '#FFD700' },  // 黄色
    { label: '较大风险', value: '#FFA500' },  // 橘色
    { label: '重大风险', value: '#FF4500' },  // 红色
    { label: '停工停产', value: '#808080' }   // 灰色
];

// 当前选中的颜色
const selectedColor = ref(colors[0].value);

// 添加图例显示状态控制
const legendStatus = ref(colors.map(color => ({
    ...color,
    visible: true
})));

// 添加 props 定义
const props = defineProps({
    readonly: {
        type: Boolean,
        default: false
    }
});

// 添加选中状态追踪
const selectedPolygons = ref(new Set());

// 添加是否可以对齐的计算属性
const canAlign = computed(() => selectedPolygons.value.size > 1);

const gridSpacing = 20; // 网格间距
// 将坐标磁吸到最近的网格线
const snapToGrid = (value) => {
    return Math.round(value / gridSpacing) * gridSpacing;
};

// 添加选择多边形的功能
const togglePolygonSelection = (index, event) => {
    if (props.readonly) return;

    // 如果按住Ctrl/Command键，则切换选择状态
    if (event.ctrlKey || event.metaKey) {
        if (selectedPolygons.value.has(index)) {
            selectedPolygons.value.delete(index);
        } else {
            selectedPolygons.value.add(index);
        }
    } else {
        // 如果没有按住Ctrl/Command键，则清除其他选择并选中当前多边形
        selectedPolygons.value.clear();
        selectedPolygons.value.add(index);
    }

    drawChart();
};



const drawChart = () => {
    const width = window.innerWidth - 10;
    const height = window.innerHeight - 300;

    // Clear container
    d3.select(chartContainer.value).selectAll('*').remove();

    // Create SVG element
    const svg = d3.select(chartContainer.value)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .style('border', '1px solid #ccc');



    if (!props.readonly && selectedPolygons.value.size === 0) {
        svg.on('click', function (event) {
            if (!drawing) {
                drawing = true;
            }
            undoStack.value.push([...points.value]);
            redoStack.value = [];
            const coords = d3.pointer(event);
            points.value.push([snapToGrid(coords[0]), snapToGrid(coords[1])]);
            updatePolygon(svg);
        });
    }

    updatePolygon(svg); // Initial call to draw empty or existing shapes
};

// Function to draw or update the polygon
const updatePolygon = (svg) => {
    // Clear previous polygon and circles
    svg.selectAll('*').remove();

    // 获取SVG的高度
    const height = svg.node().getBoundingClientRect().height;
    const width = svg.node().getBoundingClientRect().width;

    // 绘制已保存的多边形
    savedPolygons.value.forEach((polygon, index) => {
        // 检查该颜色是否应该显示
        const legendItem = legendStatus.value.find(item => item.value === polygon.color);
        if (legendItem?.visible) {
            const isSelected = selectedPolygons.value.has(index);

            svg.append('polygon')
                .attr('points', polygon.points.map(d => d.join(',')).join(' '))
                .style('fill', polygon.color)
                .attr('stroke', isSelected ? '#000' : 'black')
                .attr('stroke-width', isSelected ? 3 : 2)
                .style('cursor', 'move')
                .style('stroke-dasharray', isSelected ? '5,5' : 'none')
                .on('click', (event) => togglePolygonSelection(index, event))
                .call(
                    d3.drag()
                        .subject(() => index)
                        .on('start', dragPolygonStarted)
                        .on('drag', dragPolygon)
                        .on('end', dragPolygonEnded)
                );

            // 添加多边形名称
            if (polygon.name) {
                const center = calculatePolygonCenter(polygon.points);
                svg.append('text')
                    .attr('x', center[0])
                    .attr('y', center[1])
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    .attr('font-size', '14px')
                    .text(polygon.name);
            }
        }
    });

    // 绘制当前正在绘制的多边形
    if (points.value.length > 0) {
        const currentLegendItem = legendStatus.value.find(item => item.value === selectedColor.value);
        if (currentLegendItem?.visible) {
            svg.append('polygon')
                .attr('points', points.value.map(d => d.join(',')).join(' '))
                .style('fill', selectedColor.value)
                .attr('stroke', 'black')
                .attr('stroke-width', 2);

            // Draw circles for each vertex and make them draggable
            svg.selectAll('circle')
                .data(points.value)
                .enter()
                .append('circle')
                .attr('cx', d => d[0])
                .attr('cy', d => d[1])
                .attr('r', 6)
                .attr('fill', 'yellow')
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .call(
                    d3.drag()
                        .on('start', dragStarted)
                        .on('drag', dragged)
                        .on('end', dragEnded)
                );

            // Add the polygon name
            if (polygonName.value) {
                // Calculate the center of the polygon for placing the text
                const center = calculatePolygonCenter(points.value);
                svg.append('text')
                    .attr('x', center[0])
                    .attr('y', center[1])
                    .attr('text-anchor', 'middle')
                    .attr('fill', 'black')
                    .attr('font-size', '14px')
                    .text(polygonName.value);
            }
        }
    }

    // 添加图例（使用获取到的height）
    const legendGroup = svg.append('g')
        .attr('class', 'legend')
        .attr('transform', `translate(20, ${height - 150})`); // 左下角置

    legendStatus.value.forEach((item, index) => {
        const legendItem = legendGroup.append('g')
            .attr('transform', `translate(0, ${index * 25})`)
            .style('cursor', 'pointer')
            .on('click', (event) => {
                // 阻止事件冒泡
                event.stopPropagation();
                // 切换显示状态
                item.visible = !item.visible;
                // 重新绘制
                drawChart();
            });

        // 图例颜色框
        legendItem.append('rect')
            .attr('width', 18)
            .attr('height', 18)
            .attr('fill', item.value)
            .style('opacity', item.visible ? 1 : 0.5);

        // 图例文字
        legendItem.append('text')
            .attr('x', 24)
            .attr('y', 14)
            .text(item.label)
            .style('font-size', '14px')
            .style('opacity', item.visible ? 1 : 0.5);
    });

    if (!props.readonly) {
        // 只在非只读模式下添加拖拽功能
        svg.selectAll('circle')
            .data(points.value)
            .enter()
            .append('circle')
            .attr('cx', d => d[0])
            .attr('cy', d => d[1])
            .attr('r', 10)
            .attr('fill', 'yellow')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .call(
                d3.drag()
                    .on('start', dragStarted)
                    .on('drag', dragged)
                    .on('end', dragEnded)
            );
        // 添加网格线

        for (let x = 0; x < width; x += gridSpacing) {
            svg.append('line')
                .attr('x1', x)
                .attr('y1', 0)
                .attr('x2', x)
                .attr('y2', height)
                .style('stroke', '#ccc')
                .style('stroke-width', 0.5);
        }
        for (let y = 0; y < height; y += gridSpacing) {
            svg.append('line')
                .attr('x1', 0)
                .attr('y1', y)
                .attr('x2', width)
                .attr('y2', y)
                .style('stroke', '#ccc')
                .style('stroke-width', 0.5);
        }
    }


};

// Drag event handlers
const dragStarted = (event, d) => {
    // 只需要高亮显示被拖动的点
    d3.select(event.sourceEvent.target).raise().classed('active', true);
};

const dragged = (event, d) => {
    // 直接使用事件中的坐标
    const [x, y] = d3.pointer(event, chartContainer.value);
    d[0] = snapToGrid(x);
    d[1] = snapToGrid(y);

    drawChart();
};

const dragEnded = (event, d) => {
    d3.select(event.sourceEvent.target).classed('active', false);

    // 保存当前状态到撤销栈
    undoStack.value.push([...points.value]);
    redoStack.value = [];
};

// Function to calculate the center of the polygon
const calculatePolygonCenter = (points) => {
    const x = points.map(point => point[0]);
    const y = points.map(point => point[1]);
    const centerX = x.reduce((sum, val) => sum + val, 0) / points.length;
    const centerY = y.reduce((sum, val) => sum + val, 0) / points.length;
    return [centerX, centerY];
};

// Undo function
const undo = () => {
    if (undoStack.value.length > 0) {
        redoStack.value.push([...points.value]); // Save current state to redo stack
        points.value = undoStack.value.pop(); // Restore the last state from the undo stack
        drawChart(); // Redraw the chart
    }
};

// Redo function
const redo = () => {
    if (redoStack.value.length > 0) {
        undoStack.value.push([...points.value]); // Save current state to undo stack
        points.value = redoStack.value.pop(); // Restore the last undone state
        drawChart(); // Redraw the chart
    }
};

// Save shapes to local storage
const saveShapes = () => {
    if (points.value.length < 3 || !polygonName.value) {
        alert('请至少绘制三个点并输入多边形名称！');
        return;
    }

    const shapeData = {
        points: [...points.value],
        name: polygonName.value,
        color: selectedColor.value
    };

    savedPolygons.value.push(shapeData);

    // 保存所有多边形到 localStorage
    localStorage.setItem('savedShapes', JSON.stringify(savedPolygons.value));

    // 清空当前绘制的多边形，准备绘制新的
    points.value = [];
    polygonName.value = '';
    undoStack.value = [];
    redoStack.value = [];
    drawing = false;
    // 清空选择状态
    selectedPolygons.value.clear();

    // 重新绘制
    drawChart();

    alert('图形已保存!');
};

// Clear all shapes and reset
const clearShapes = () => {
    // 清空所有数据
    points.value = [];
    polygonName.value = '';
    undoStack.value = [];
    redoStack.value = [];
    savedPolygons.value = [];
    drawing = false;
    // 清空选择状态
    selectedPolygons.value.clear();
    localStorage.removeItem('savedShapes');
    drawChart();
};

// Set shape type (for extensibility)
const setShape = (shape) => {
    if (shape === 'polygon') {
        clearShapes(); // Clear the current drawing and set up for a new polygon
    }
};

// Computed properties to check if undo/redo actions are possible
const canUndo = computed(() => undoStack.value.length > 0);
const canRedo = computed(() => redoStack.value.length > 0);

// 添加下载图形功能
const downloadImage = () => {
    // 获取SVG元素
    const svg = d3.select(chartContainer.value).select('svg').node();

    // 创建一个临时的Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // 设置Canvas尺寸与SVG相同
    canvas.width = svg.width.baseVal.value;
    canvas.height = svg.height.baseVal.value;

    // 将SVG转换为图片数据
    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    // 创建图片对象
    const img = new Image();
    img.onload = () => {
        // 在Canvas上绘制图片
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // 将Canvas转换为图片并下载
        const imgURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${polygonName.value || 'polygon'}.png`;
        link.href = imgURL;
        link.click();

        // 清理资源
        URL.revokeObjectURL(url);
    };
    img.src = url;
};

// 添加键盘事件处理函数
const handleKeyboard = (event) => {
    if (props.readonly) return; // 只读模式下不处��键盘事件

    // 撤销：Ctrl+Z 或 Command+Z
    if ((event.ctrlKey || event.metaKey) && !event.shiftKey && event.key === 'z') {
        event.preventDefault();
        undo();
    }
    // 重做：Ctrl+Shift+Z 或 Command+Shift+Z
    else if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key === 'z') {
        event.preventDefault();
        redo();
    }
    // 删除：Backspace 或 Delete
    else if ((event.key === 'Backspace' || event.key === 'Delete') && canDelete.value) {
        event.preventDefault();
        deleteSelected();
    }
};

// Lifecycle hook to initialize the drawing area
onMounted(() => {
    const savedData = localStorage.getItem('savedShapes');
    if (savedData) {
        savedPolygons.value = JSON.parse(savedData);
    }
    drawChart();

    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeyboard);
});

// 添加 onUnmounted 清理事件监听
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyboard);
});

// 添加以下新函数用于多边形拖动
const dragPolygonStarted = (event) => {
    // 记录初始位置和初始鼠标位置
    const polygon = savedPolygons.value[event.subject];
    polygon.startPoints = JSON.parse(JSON.stringify(polygon.points));
    polygon.startMousePos = d3.pointer(event.sourceEvent, chartContainer.value);
};

const dragPolygon = (event) => {
    const polygon = savedPolygons.value[event.subject];
    const currentMousePos = d3.pointer(event.sourceEvent, chartContainer.value);

    // 计算鼠标移动的距离
    const dx = currentMousePos[0] - polygon.startMousePos[0];
    const dy = currentMousePos[1] - polygon.startMousePos[1];

    // 基于初始位置和鼠标移动距离来更新多边形位置
    polygon.points = polygon.startPoints.map(point => [
        point[0] + dx,
        point[1] + dy
    ]);

    // 重新绘制
    drawChart();
};

const dragPolygonEnded = (event) => {
    // 清理临时数据
    const polygon = savedPolygons.value[event.subject];
    delete polygon.startPoints;
    delete polygon.startMousePos;

    // 保存到localStorage
    localStorage.setItem('savedShapes', JSON.stringify(savedPolygons.value));
};

// 添加对齐功能
const alignShapes = (alignment) => {
    if (selectedPolygons.value.size < 2) return;

    const selectedIndices = Array.from(selectedPolygons.value);
    const selectedShapes = selectedIndices.map(index => savedPolygons.value[index]);

    // 计算边界框
    const bounds = selectedShapes.map(polygon => {
        const xs = polygon.points.map(p => p[0]);
        const ys = polygon.points.map(p => p[1]);
        return {
            left: Math.min(...xs),
            right: Math.max(...xs),
            top: Math.min(...ys),
            bottom: Math.max(...ys),
            width: Math.max(...xs) - Math.min(...xs),
            height: Math.max(...ys) - Math.min(...ys),
            centerX: (Math.max(...xs) + Math.min(...xs)) / 2,
            centerY: (Math.max(...ys) + Math.min(...ys)) / 2
        };
    });

    // 根据不同的齐方式计算偏移量
    selectedShapes.forEach((polygon, i) => {
        const currentBound = bounds[i];
        let dx = 0, dy = 0;

        switch (alignment) {
            case 'left':
                dx = Math.min(...bounds.map(b => b.left)) - currentBound.left;
                break;
            case 'center':
                const centerX = bounds.reduce((sum, b) => sum + b.centerX, 0) / bounds.length;
                dx = centerX - currentBound.centerX;
                break;
            case 'right':
                dx = Math.max(...bounds.map(b => b.right)) - currentBound.right;
                break;
            case 'top':
                dy = Math.min(...bounds.map(b => b.top)) - currentBound.top;
                break;
            case 'middle':
                const centerY = bounds.reduce((sum, b) => sum + b.centerY, 0) / bounds.length;
                dy = centerY - currentBound.centerY;
                break;
            case 'bottom':
                dy = Math.max(...bounds.map(b => b.bottom)) - currentBound.bottom;
                break;
        }

        // 应用偏移量
        polygon.points = polygon.points.map(point => [
            point[0] + dx,
            point[1] + dy
        ]);
    });

    // 保存更改并重绘
    localStorage.setItem('savedShapes', JSON.stringify(savedPolygons.value));
    drawChart();
};

// 添加是否可以删除的计算属性
const canDelete = computed(() => selectedPolygons.value.size > 0);

// 添加删除选中多边形的功能
const deleteSelected = () => {
    if (selectedPolygons.value.size === 0) return;

    // 获取选中的索引并按降序排序（从后往前删除）
    const indicesToDelete = Array.from(selectedPolygons.value).sort((a, b) => b - a);

    // 删除选中的多边形
    indicesToDelete.forEach(index => {
        savedPolygons.value.splice(index, 1);
    });

    // 清空选择状态
    selectedPolygons.value.clear();

    // 保存更改到localStorage
    localStorage.setItem('savedShapes', JSON.stringify(savedPolygons.value));

    // 重新绘制
    drawChart();
};
</script>

<style scoped>
.container {
    background: transparent;
}

.chart-container {
    margin: 20px 5px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toolbar {
    margin: 20px;
    padding: 15px;
    background-color: transparent;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

button {
    margin-right: 5px;
    margin-left: 5px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
}

button:hover {
    background-color: #45a049;
}

button:disabled {
    background-color: transparent;
    cursor: not-allowed;
}

input {
    margin-left: 10px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    width: 200px;
}

input:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.shortcuts-tips {
    margin-top: 15px;
    padding: 10px;
    background-color: transparent;
    border-radius: 4px;
    font-size: 14px;
}

.shortcuts-tips p {
    margin: 0 0 8px 0;
    color: #333;
    font-weight: bold;
}

.shortcuts-tips ul {
    margin: 0;
    padding-left: 20px;
    color: #666;
}

.shortcuts-tips li {
    margin: 4px 0;
}

/* 为拖动点添加样式 */
:deep(circle) {
    cursor: move;
    transition: fill 0.2s;
}

:deep(circle:hover) {
    fill: #ffd700;
}

:deep(circle.active) {
    fill: #ff9800;
}

/* 为多边形添加样式 */
:deep(polygon) {
    fill-opacity: 0.5;
    transition: fill-opacity 0.3s;
}

:deep(polygon:hover) {
    fill-opacity: 0.7;
}

/* 为文本添加样式 */
:deep(text) {
    user-select: none;
    font-family: Arial, sans-serif;
}

.color-picker {
    display: inline-flex;
    gap: 8px;
    margin: 0 10px;
    vertical-align: middle;
}

.color-option {
    width: 24px;
    height: 24px;
    border-radius: 4px;
    cursor: pointer;
    border: 2px solid transparent;
    transition: all 0.3s;
}

.color-option:hover {
    transform: scale(1.1);
}

.color-option.active {
    border-color: #333;
    transform: scale(1.1);
}

:deep(.legend) {
    background-color:var(--background);
    padding: 10px;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:deep(.legend rect) {
    transition: opacity 0.3s;
}

:deep(.legend text) {
    transition: opacity 0.3s;
}

:deep(.legend g:hover) {
    opacity: 0.8;
}

/* 只读模式下移除交互样式 */
.readonly :deep(polygon) {
    cursor: default;
}

.readonly :deep(circle) {
    cursor: default;
}

/* 添加选中多边形的样式 */
:deep(polygon.selected) {
    stroke-dasharray: 5, 5;
    stroke-width: 3;
}
</style>
